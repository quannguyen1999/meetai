"use client";

import { ColumnDef } from "@tanstack/react-table";
import { GeneratedAvatar } from "@/components/generated-avatar";
import {
  CircleCheckIcon,
  CircleXIcon,
  ClockArrowUpIcon,
  ClockFadingIcon,
  CornerDownRightIcon,
  LoaderIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { MeetingGetMany } from "@/modules/meetings/types";
import { format } from "util";
import { humanizeDuration } from "humanize-duration";

function formatDuration(seconds: number) {
  return humanizeDuration(seconds * 1000, {
    largest: 1,
    units: ["h", "m", "s"],
    round: true,
  });
}

const statusIconMap = {
  upcoming: ClockFadingIcon,
  active: LoaderIcon,
  cancelled: CircleXIcon,
  completed: CircleCheckIcon,
  processing: ClockArrowUpIcon,
};

const statusColorMap = {
  upcoming: "bg-yellow-500/20 text-yellow-800 border-yellow-700/5",
  active: "bg-blue-500/20 text-blue-800 border-blue-700/5",
  cancelled: "bg-red-500/20 text-red-800 border-red-700/5",
  completed: "bg-green-500/20 text-green-800 border-green-700/5",
  processing: "bg-gray-500/20 text-gray-800 border-gray-700/5",
};

export const columns: ColumnDef<MeetingGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Meeting Name",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-y-1">
          <span className="font-semibold text-sm">{row.original.name}</span>
          <div className="flex items-center gap-x-2">
            <div className="flex items-center gap-x-1">
              <CornerDownRightIcon className="size-3 text-muted-foreground" />
              <span className="text-sm text-muted-foreground max-w-[200px] truncate capitalize">
                {row.original.agent.name}
              </span>
            </div>
            <GeneratedAvatar
              variant="botttsNeutral"
              seed={row.original.agent.name}
              classname="size-6"
            />
            <span className="text-sm text-muted-foreground">
              {row.original.startedAt
                ? format(row.original.startedAt, "MMM d")
                : ""}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const Icon =
        statusIconMap[row.original.status as keyof typeof statusIconMap];
      return (
        <Badge
          variant="outline"
          className={cn(
            "capitalize text-muted-foreground [&>svg]:size-4",
            statusColorMap[row.original.status as keyof typeof statusColorMap]
          )}
        >
          <Icon
            className={cn(row.original.status === "upcoming" && "animate-spin")}
          />

          {row.original.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => {
      return (
        <Badge
          variant="outline"
          className="capitalize flex items-center gap-x-2 [&>svg]:size-4"
        >
          <ClockFadingIcon className="text-blue-700" />
          {row.original.duration
            ? formatDuration(row.original.duration)
            : "No duration"}
        </Badge>
      );
    },
  },
];
