import { h } from "vue";
import type { Report } from ".";
import type { ColumnDef } from "@tanstack/vue-table";
import SortableHeader from "~/components/ui/data-table/SortableHeader.vue";
import ActionsCell from "./ActionsCell.vue";
import StatusCell from "./StatusCell.vue";

export const columns: ColumnDef<Report>[] = [
  {
    accessorKey: "name",
    header: ({ column }) =>
      h(SortableHeader<Report>, { column }, () => "Job Name"),
    cell: ({ row }) =>
      h(
        "p",
        { name: row.getValue<string>("name"), id: row.original.id },
        row.getValue("name"),
      ),
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
    accessorKey: "actions",
    header: () => h("div", { class: "text-right" }, "Actions"),
    cell: ({ row }) => h(ActionsCell, { row }),
  },
];
