import { h } from "vue";
import type { Job } from ".";
import type { ColumnDef } from "@tanstack/vue-table";
import SortableHeader from "~/components/ui/data-table/SortableHeader.vue";
import ActionsCell from "./ActionsCell.vue";
import NameCell from "./NameCell.vue";
import StatusCell from "./StatusCell.vue";
import AgentCell from "./AgentCell.vue";
import ToolsCell from "./ToolsCell.vue";
import DateTimeCell from "./DateTimeCell.vue";

export const columns: ColumnDef<Job>[] = [
  {
    accessorKey: "name",
    header: ({ column }) =>
      h(SortableHeader<Job, unknown>, { column }, () => "Job Name"),
    cell: ({ row }) =>
      h(NameCell, { name: row.getValue<string>("name"), id: row.original.id }),
  },
  {
    accessorKey: "status",
    header: ({ column }) =>
      h(SortableHeader<Job, unknown>, { column }, () => "Status"),
    cell: ({ row }) =>
      h(StatusCell, { status: row.getValue<string>("status") }),
    filterFn: "arrIncludesSome",
  },
  {
    accessorKey: "agentId",
    header: ({ column }) =>
      h(SortableHeader<Job, unknown>, { column }, () => "Agent"),
    cell: ({ row }) =>
      h(AgentCell, { agentId: row.getValue<string>("agentId") }),
    filterFn: "arrIncludesSome",
  },
  {
    accessorKey: "tools",
    header: () => "Tools",
    cell: ({ row }) => h(ToolsCell, { tools: row.getValue<string[]>("tools") }),
    getUniqueValues: (row) => row.tools ?? [],
  },
  {
    accessorKey: "started",
    header: ({ column }) =>
      h(SortableHeader<Job, unknown>, { column }, () => "Started"),
    cell: ({ row }) =>
      h(DateTimeCell, { datetime: row.getValue<Date>("started") }),
  },
  {
    accessorKey: "duration",
    header: ({ column }) =>
      h(SortableHeader<Job, unknown>, { column }, () => "Duration"),
    cell: ({ row }) => row.getValue<string>("duration") ?? "-",
  },
  {
    accessorKey: "actions",
    header: () => h("div", { class: "text-right" }, "Actions"),
    cell: ({ row }) => h(ActionsCell, { row }),
  },
];
