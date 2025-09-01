import { h } from "vue";
import type { Agent } from ".";
import type { ColumnDef } from "@tanstack/vue-table";
import Header from "../ui/data-table/SortableHeader.vue";
import AvailableToolsCell from "./AvailableToolsCell.vue";
import ActionsCell from "./ActionsCell.vue";
import NameCell from "./NameCell.vue";
import { DateTimeCell, SortableHeader } from "~/components/ui/data-table";

export const columns: ColumnDef<Agent>[] = [
  {
    accessorKey: "name",
    header: ({ column }) =>
      h(SortableHeader<Agent, unknown>, { column }, () => "Name"),
    cell: ({ row }) =>
      h(NameCell, { name: row.getValue<string>("name"), id: row.original.id }),
  },
  {
    accessorKey: "description",
    header: ({ column }) =>
      h(Header<Agent, unknown>, { column }, () => "Description"),
    cell: ({ row }) =>
      h("div", { class: "flex flex-col" }, [
        h(
          "span",
          {
            class:
              "text-sm font-medium text-muted-foreground overflow-hidden text-ellipsis",
          },
          row.getValue("description"),
        ),
      ]),
  },
  {
    accessorKey: "hostname",
    header: ({ column }) =>
      h(Header<Agent, unknown>, { column }, () => "Hostname"),
    cell: ({ row }) =>
      h("div", { class: "flex flex-col" }, [
        h(
          "span",
          { class: "text-sm font-medium text-muted-foreground" },
          row.getValue("hostname"),
        ),
      ]),
  },
  {
    accessorKey: "platform",
    header: ({ column }) =>
      h(Header<Agent, unknown>, { column }, () => "Platform"),
    cell: ({ row }) =>
      h("div", { class: "flex flex-col" }, [
        h(
          "span",
          { class: "text-sm font-medium text-muted-foreground" },
          row.getValue("platform"),
        ),
      ]),
    filterFn: "arrIncludesSome",
  },
  {
    accessorKey: "created_at",
    header: ({ column }) =>
      h(Header<Agent, unknown>, { column }, () => "Created at"),
    cell: ({ row }) =>
      h(DateTimeCell, {
        datetime: row.getValue<Agent["created_at"]>("created_at"),
      }),
  },
  {
    accessorKey: "last_seen_at",
    header: ({ column }) =>
      h(SortableHeader<Agent, unknown>, { column }, () => "Last Seen At"),
    cell: ({ row }) =>
      h(DateTimeCell, {
        datetime: row.getValue<Agent["last_seen_at"]>("last_seen_at"),
      }),
  },

  {
    accessorKey: "available_tools",
    header: () => "Available tools",
    cell: ({ row }) =>
      h(AvailableToolsCell, {
        availableTools:
          row.getValue<Agent["available_tools"]>("available_tools"),
      }),
    // Fix: Return individual tool commands, not the whole objects
    getUniqueValues: (row) => {
      return row.available_tools.map((v) => v.cmd);
    },
    // Fix: Add validation for filterValue
    filterFn: (row, colID, filterValue: string[]) => {
      return filterValue.every((filter) =>
        row.original.available_tools.map(({ cmd }) => cmd).includes(filter),
      );
    },
  },

  {
    accessorKey: "jobs",
    header: ({ column }) =>
      h(
        Header<Agent, unknown>,
        { class: "text-right justify-end", column },
        () => "Jobs",
      ),
    cell: ({ row }) =>
      h(
        "div",
        { class: "text-sm font-medium text-muted-foreground" },
        row.getValue<Agent["jobs"]>("jobs").length,
      ),
  },
  {
    accessorKey: "actions",
    header: () => h("div", { class: "text-right" }, "Details"),
    cell: ({ row }) => h(ActionsCell, { row }),
  },
];
