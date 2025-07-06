"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { columns } from "@/modules/meetings/ui/components/columns";
import { DataTable } from "@/components/data-table";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { EmptyState } from "@/components/empty-state";
import { useRouter } from "next/navigation";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import { DataPagination } from "@/components/data-pagination";

export const MeetingsView = () => {
  const trpc = useTRPC();
  const router = useRouter();
  const [filters, setFilters] = useMeetingsFilters();
  const { data } = useQuery(trpc.meetings.getMany.queryOptions({ ...filters }));
  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable
        columns={columns}
        data={data?.items ?? []}
        onRowClick={(row) => router.push(`/meetings/${row.id}`)}
      />
      <DataPagination
        page={filters.page}
        totalPages={data?.totalPages ?? 1}
        onPageChange={(page) => setFilters({ page })}
      />
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
