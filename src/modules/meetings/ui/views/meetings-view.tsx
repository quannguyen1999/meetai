"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { columns } from "@/modules/meetings/ui/components/columns";
import { DataTable } from "@/components/data-table";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { EmptyState } from "@/components/empty-state";

export const MeetingsView = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.meetings.getMany.queryOptions({}));
  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable columns={columns} data={data?.items ?? []} />
      {data?.items.length === 0 && (
        <EmptyState
          title="No meetings found"
          description="You don't have any meetings yet. Create one to get started."
        />
      )}
    </div>
  );
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
