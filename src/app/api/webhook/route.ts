import {
  CallEndedEvent,
  CallRecordingReadyEvent,
  CallSessionStartedEvent,
  CallTranscriptionReadyEvent,
} from "@stream-io/node-sdk";
import { db } from "@/db";
import { streamClient } from "@/lib/stream-video";
import { NextRequest, NextResponse } from "next/server";
import { and, eq, not } from "drizzle-orm";
import { agents, meetings } from "@/db/schema";
import {
  CallSessionParticipantLeftEvent,
  StreamVideo,
} from "@stream-io/video-react-sdk";
import { inngest } from "@/inngest/client";

function verifySignatureWithSDK(body: any, signature: string): boolean {
  return streamClient.verifyWebhook(body, signature);
}

export async function POST(request: NextRequest) {
  const apiKey = request.headers.get("x-api-key") || "";
  const signature = request.headers.get("x-signature") || "";

  if (!apiKey || !signature) {
    return new Response("Missing API key or signature", { status: 400 });
  }

  const body = await request.text();

  if (!verifySignatureWithSDK(body, signature)) {
    return new Response("Unauthorized", { status: 401 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(body) as Record<string, unknown>;
  } catch (error) {
    return new Response("Invalid JSON", { status: 400 });
  }

  const eventType = (payload as Record<string, unknown>).type;

  if (eventType === "call.session_started") {
    const event = payload as CallSessionStartedEvent;
    const meetingId = event.call.custom?.meeting_id;

    if (!meetingId) {
      return new Response("Missing meeting ID", { status: 400 });
    }

    const [meeting] = await db
      .select()
      .from(meetings)
      .where(
        and(
          eq(meetings.id, meetingId),
          not(eq(meetings.status, "completed")),
          not(eq(meetings.status, "active")),
          not(eq(meetings.status, "cancelled")),
          not(eq(meetings.status, "processing"))
        )
      );

    if (!meeting) {
      return new Response("Meeting not found", { status: 404 });
    }

    await db
      .update(meetings)
      .set({
        status: "active",
        startedAt: new Date(),
      })
      .where(eq(meetings.id, meetingId));

    const [existingAgent] = await db
      .select()
      .from(agents)
      .where(eq(agents.id, meeting.agentId));

    if (!existingAgent) {
      return new Response("Agent not found", { status: 404 });
    }

    const call = streamClient.video.call("Default", meetingId);
    const realtimeClient = await streamClient.video.connectOpenAi({
      call,
      agentUserId: existingAgent.id,
      openAiApiKey: process.env.OPENAI_API_KEY!,
    });

    realtimeClient.updateSession({
      instructions: existingAgent.instructions,
    });
  } else if (eventType === "call.session_participant_left") {
    const event = payload as CallSessionParticipantLeftEvent;
    const meetingId = event.call_cid.split(":")[1];

    if (!meetingId) {
      return new Response("Missing meeting ID", { status: 400 });
    }

    const call = streamClient.video.call("default", meetingId);
    await call.end();
  } else if (eventType === "call.session_ended") {
    const event = payload as CallEndedEvent;
    const meetingId = event.call.custom?.meeting_id;

    if (!meetingId) {
      return new Response("Missing meeting ID", { status: 400 });
    }

    await db
      .update(meetings)
      .set({
        status: "processing",
        endedAt: new Date(),
      })
      .where(and(eq(meetings.id, meetingId), eq(meetings.status, "active")));
  } else if (eventType === "call.transcription_ready") {
    const event = payload as CallTranscriptionReadyEvent;
    const meetingId = event.call_cid.split(":")[1];

    const [updatedMeeting] = await db
      .update(meetings)
      .set({
        transcriptUrl: event.call_transcription.url,
      })
      .where(eq(meetings.id, meetingId))
      .returning();

    if (!updatedMeeting) {
      return new Response("Meeting not found", { status: 404 });
    }

    await inngest.send({
      name: "meetings/processing",
      data: {
        meetingId: updatedMeeting.id,
        transcriptUrl: updatedMeeting.transcriptUrl,
      },
    });
  } else if (eventType === "call.recording_ready") {
    const event = payload as CallRecordingReadyEvent;
    const meetingId = event.call_cid.split(":")[1];

    await db
      .update(meetings)
      .set({
        recordingUrl: event.call_recording.url,
      })
      .where(eq(meetings.id, meetingId))
      .returning();
  }

  return NextResponse.json({ status: "ok" });
}
