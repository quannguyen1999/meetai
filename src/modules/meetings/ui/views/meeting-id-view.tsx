"use client";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MeetingIdViewHeader } from "../components/meeting-id-view-header";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/hooks/use-confirm";
import { UpdateMeetingDialog } from "../components/update-meeting-dialog";
import { useState } from "react";
import { UpcomingState } from "../components/upcoming-state";
import { ActiveState } from "../components/active-state";
import { CancelledState } from "../components/cancelled-state";
import { ProcessingState } from "../components/processing-state";

interface Props {
  meetingId: string;
}

export const MeetingIdView = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);
  const { data } = useQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  const [RemoveConfirmationDialog, confirmRemove] = useConfirm(
    "Remove meeting",
    "Are you sure you want to remove this meeting? This action cannot be undone."
  );
  const router = useRouter();
  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        router.push("/meetings");
      },
    })
  );
  const handlerRemoveMeeting = async () => {
    const ok = await confirmRemove();
    if (ok) {
      await removeMeeting.mutateAsync({ id: meetingId });
    }
  };

  const isActive = data?.status === "active";
  const isCompleted = data?.status === "completed";
  const isCancelled = data?.status === "cancelled";
  const isProcessing = data?.status === "processing";
  const isUpcoming = data?.status === "upcoming";
  return (
    <>
      <RemoveConfirmationDialog />
      {data && (
        <UpdateMeetingDialog
          open={updateMeetingDialogOpen}
          onOpenChange={setUpdateMeetingDialogOpen}
          initialValues={data}
        />
      )}
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <MeetingIdViewHeader
          meetingId={meetingId}
          meetingName={data?.name ?? ""}
          onEdit={() => setUpdateMeetingDialogOpen(true)}
          onRemove={handlerRemoveMeeting}
        />
        {isCancelled && <CancelledState />}
        {isCompleted && <h1>Completed</h1>}
        {isActive && <ActiveState meetingId={meetingId} />}
        {isProcessing && <ProcessingState />}
        {isUpcoming && (
          <UpcomingState
            meetingId={meetingId}
            onCancelMeeting={() => {}}
            isCancelling={false}
          />
        )}
      </div>
    </>
  );
};

export const MeetingIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading meeting..."
      description="We are loading your meeting..."
    />
  );
};

export const MeetingIdViewError = () => {
  return (
    <ErrorState
      title="Error loading meeting"
      description="We are unable to load your meeting"
    />
  );
};
