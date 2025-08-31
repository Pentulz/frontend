import { h } from "vue";
import type { Job } from ".";
import type { ColumnDef } from "@tanstack/vue-table";
import ActionCell from "./ActionCell.vue";
import ActionsCell from "./ActionsCell.vue";
import NameCell from "./NameCell.vue";
import StatusCell from "./StatusCell.vue";
import AgentCell from "./AgentCell.vue";
import ToolsCell from "./ToolsCell.vue";
import { DateTimeCell, SortableHeader } from "~/components/ui/data-table";

export const columns: ColumnDef<Job>[] = [
  {
    accessorKey: "name",
    header: ({ column }) =>
      h(SortableHeader<Job, unknown>, { column }, () => "Name"),
    cell: ({ row }) =>
      h(NameCell, { name: row.getValue<string>("name"), id: row.original.id }),
  },
  {
    id: "status", // Use 'id' instead of 'accessorKey' since we're computing this
    header: ({ column }) =>
      h(SortableHeader<Job, unknown>, { column }, () => "Status"),
    cell: ({ row }) => {
      const startedAt = row.original.started_at;
      const completedAt = row.original.completed_at;
      return h(StatusCell, {
        started_at: startedAt,
        completed_at: completedAt,
      });
    },
    // For filtering purposes, compute the status value
    getUniqueValues: (row) => {
      const startedAt = row.original.started_at;
      const completedAt = row.original.completed_at;

      if (completedAt) return "Completed";
      if (startedAt) return "Running";
      return "Pending";
    },
    filterFn: (row, columnId, filterValue: string[]) => {
      const startedAt = row.original.started_at;
      const completedAt = row.original.completed_at;

      let status: string;
      if (completedAt) status = "Completed";
      else if (startedAt) status = "Running";
      else status = "Pending";

      return filterValue?.includes(status) ?? false;
    },
  },
  {
    accessorKey: "agent_id",
    header: ({ column }) =>
      h(SortableHeader<Job, unknown>, { column }, () => "Agent"),
    cell: ({ row }) =>
      h(AgentCell, { agentId: row.getValue<string>("agent_id") }),
    filterFn: "arrIncludesSome",
  },
  {
    accessorKey: "action",
    header: () => "Action",
    cell: ({ row }) =>
      h(ActionCell, { action: row.getValue<string[]>("action") }),
    getUniqueValues: (row) => row.action ?? [],
  },
  {
    accessorKey: "created_at",
    header: ({ column }) =>
      h(SortableHeader<Job, unknown>, { column }, () => "Created At"),
    cell: ({ row }) =>
      h(DateTimeCell, { datetime: row.getValue<Date>("created_at") }),
  },
  {
    accessorKey: "actions",
    header: () => h("div", { class: "text-right" }, "Actions"),
    cell: ({ row }) => h(ActionsCell, { row }),
  },
];
