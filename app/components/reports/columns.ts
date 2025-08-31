import { h } from "vue";
import type { Report } from ".";
import type { ColumnDef } from "@tanstack/vue-table";
import { SortableHeader, DateTimeCell } from "~/components/ui/data-table";
import ActionsCell from "./ActionsCell.vue";
import StatusCell from "./StatusCell.vue";

export const columns: ColumnDef<Report>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => h(SortableHeader<Report>, { column }, () => "ID"),
    cell: ({ row }) => row.getValue<string>("id"),
  },
  {
    accessorKey: "status",
    header: ({ column }) =>
      h(SortableHeader<Report>, { column }, () => "Status"),
    cell: ({ row }) =>
      h(StatusCell, { status: row.getValue<string>("status") }),
    filterFn: "arrIncludesSome",
  },
  {
    accessorKey: "risk_level",
    header: ({ column }) =>
      h(SortableHeader<Report>, { column }, () => "Risk level"),
    cell: ({ row }) => row.getValue("risk_level"),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) =>
      h(SortableHeader<Report>, { column }, () => "Created"),
    cell: ({ row }) =>
      h(DateTimeCell, {
        datetime: row.getValue<Date>("created_at"),
      }),
  },
  {
    accessorKey: "actions",
    header: () => h("div", { class: "text-right" }, "Actions"),
    cell: ({ row }) => h(ActionsCell, { row }),
  },
];
