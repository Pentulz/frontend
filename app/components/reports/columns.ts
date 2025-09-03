import { h } from "vue";
import type { Report } from "~/composables/use-api";
import type { ColumnDef } from "@tanstack/vue-table";
import { SortableHeader, DateTimeCell } from "~/components/ui/data-table";
import ActionsCell from "./ActionsCell.vue";

const severityMap = {
  Critical: 5,
  High: 4,
  Medium: 3,
  Low: 2,
  Info: 1,
  None: 0,
} as const;

const distribHighest = ({
  critical,
  high,
  medium,
  low,
  info,
}: Report["results"]["summary"]["severity_distribution"]) => {
  if (critical) return "Critical";
  if (high) return "High";
  if (medium) return "Medium";
  if (low) return "Low";
  if (info) return "Info";
  return "None";
};

export const columns: ColumnDef<Report>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => h(SortableHeader<Report>, { column }, () => "ID"),
    cell: ({ row }) => row.getValue<string>("id"),
  },
  {
    accessorKey: "results",
    accessorFn: (row) =>
      distribHighest(row.results.summary.severity_distribution),
    header: ({ column }) =>
      h(SortableHeader<Report>, { column }, () => "Risk level"),
    cell: ({ row }) => row.getValue("results"),
    filterFn: "arrIncludesSome",
    sortingFn: (lhs, rhs) =>
      severityMap[lhs.getValue<keyof typeof severityMap>("results")] -
      severityMap[rhs.getValue<keyof typeof severityMap>("results")],
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
