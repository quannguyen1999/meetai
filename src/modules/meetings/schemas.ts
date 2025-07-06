import { z } from "zod";
import { AgentIdView } from "../agents/ui/views/agent-id-view";

export const meetingInsertSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  agentId: z.string().min(1, { message: "Agent ID is required" }),
});

export const meetingUpdateSchema = meetingInsertSchema.extend({
  id: z.string().min(1, { message: "Meeting ID is required" }),
});
