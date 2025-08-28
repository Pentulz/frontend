import { h } from "vue";
import type { Agent } from ".";
import type { ColumnDef } from "@tanstack/vue-table";
import Header from "../ui/data-table/SortableHeader.vue";
import CapabilitiesCell from "./CapabilitiesCell.vue";
import StatusCell from "./StatusCell.vue";
import TypeCell from "./TypeCell.vue";
import ActionsCell from "./ActionsCell.vue";

export const columns: ColumnDef<Agent>[] = [
  {
    accessorKey: "name",
    header: ({ column }) =>
      h(Header<Agent, unknown>, { column }, () => "Agent name"),
    cell: ({ row }) =>
      h("div", { class: "flex flex-col" }, [
        h("p", { class: "text-sm font-medium" }, row.getValue("name")),
        h(
          "span",
          { class: "text-sm font-medium text-muted-foreground" },
          row.original.id,
        ),
      ]),
  },
  {
    accessorKey: "status",
    header: ({ column }) =>
      h(Header<Agent, unknown>, { column }, () => "Status"),
    cell: ({ row }) =>
      h(StatusCell, { status: row.getValue<string>("status") }),
  },
  {
    accessorKey: "type",
    header: ({ column }) => h(Header<Agent, unknown>, { column }, () => "Type"),
    cell: ({ row }) => h(TypeCell, { type: row.getValue<string>("type") }),
    filterFn: "arrIncludesSome",
  },
  {
    accessorKey: "ip",
    header: ({ column }) =>
      h(Header<Agent, unknown>, { column }, () => "IP Address"),
    cell: ({ row }) =>
      h("div", { class: "flex flex-col" }, [
        h("p", { class: "text-sm font-medium" }, row.getValue("ip")),
        h(
          "span",
          { class: "text-sm font-medium text-muted-foreground" },
          row.original.os,
        ),
      ]),
  },
  {
    accessorKey: "capabilities",
    header: () => "Capabilities",
    cell: ({ row }) =>
      h(CapabilitiesCell, {
        capabilities: row.getValue<string[]>("capabilities"),
      }),
    getUniqueValues: (row) => row.capabilities ?? [],
    filterFn: "arrIncludesAll",
  },
  {
    accessorKey: "jobs",
    header: ({ column }) =>
      h(
        Header<Agent, unknown>,
        { class: "text-right justify-end", column },
        () => "Jobs",
      ),
    cell: ({ row }) => h("div", { class: "text-right" }, row.getValue("jobs")),
  },
  {
    accessorKey: "actions",
    header: () => h("div", { class: "text-right" }, "Actions"),
    cell: ({ row }) => h(ActionsCell, { row }),
  },
];
