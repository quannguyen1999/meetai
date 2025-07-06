"use clinet";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export const MeetingsView = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.meetings.getMany.queryOptions({}));
  return <div>{JSON.stringify(data?.items)}</div>;
};

export const MeetingsViewLoading = () => {
  return (
    <LoadingState
      title="Loading agents..."
      description="We are loading your agents..."
    />
  );
};

export const MeetingsViewError = () => {
  return (
    <ErrorState
      title="Loading agents..."
      description="We are loading your agents..."
    />
  );
};
