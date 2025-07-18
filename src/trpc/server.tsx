import { cache } from "react";
import { makeQueryClient } from "./query-client";
import { appRouter } from "./routers/_app";
import { createTRPCContext } from "./init";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { createTRPCClient, httpBatchLink, httpLink } from "@trpc/client";

export const getQueryClient = cache(makeQueryClient);

export const trpc = createTRPCOptionsProxy({
  ctx: createTRPCContext,
  router: appRouter,
  queryClient: getQueryClient,
});

export const caller = appRouter.createCaller(createTRPCContext);
