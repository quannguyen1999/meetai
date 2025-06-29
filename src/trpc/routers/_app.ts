import z from "zod";
import { agentsRouter } from "@/modules/agents/server/procedures";
import { baseProcedure, createTRPCContext, createTRPCRouter } from "../init";

export const appRouter = createTRPCRouter({
  agents: agentsRouter,
});

export type AppRouter = typeof appRouter;
