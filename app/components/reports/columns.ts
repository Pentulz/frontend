import { h } from "vue";
import type { Report } from ".";
import type { ColumnDef } from "@tanstack/vue-table";
import { SortableHeader, DateTimeCell } from "~/components/ui/data-table";
import ActionsCell from "./ActionsCell.vue";
import StatusCell from "./StatusCell.vue";
import HostsCell from "./HostsCell.vue";
import VunlerabilitiesCell from "./VunlerabilitiesCell.vue";

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
    accessorKey: "hosts",
    header: ({ column }) =>
      h(SortableHeader<Report>, { column }, () => "Hosts Found"),
    cell: ({ row }) =>
      h(HostsCell, { hosts: row.getValue<number | undefined>("hosts") }),
  },
  {
    accessorKey: "vulnerabilities",
    header: () => "Vulnerabilities",
    cell: ({ row }) =>
      h(VunlerabilitiesCell, {
        vulnerabilities: row.getValue<
          { count: number; highest: string } | undefined
        >("vulnerabilities"),
      }),
  },
  {
    accessorKey: "jobs",
    header: ({ column }) =>
      h(
        SortableHeader<Report>,
        { class: "text-right justify-end", column },
        () => "Jobs",
      ),
    cell: ({ row }) => h("div", { class: "text-right" }, row.getValue("jobs")),
  },
  {
    accessorKey: "created",
    header: ({ column }) =>
      h(SortableHeader<Report>, { column }, () => "Created"),
    cell: ({ row }) =>
      h(DateTimeCell, { datetime: row.getValue<Date>("created") }),
  },
  {
    accessorKey: "actions",
    header: () => h("div", { class: "text-right" }, "Actions"),
    cell: ({ row }) => h(ActionsCell, { row }),
  },
];
