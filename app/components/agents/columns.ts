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
  },
  {
    accessorKey: "last_seen_at",
    header: ({ column }) =>
      h(SortableHeader<Agent, unknown>, { column }, () => "Last Seen At"),
    cell: ({ row }) =>
      h(DateTimeCell, { datetime: row.getValue<Date>("last_seen_at") }),
  },

  {
    accessorKey: "available_tools",
    header: () => "Available tools",
    cell: ({ row }) =>
      h(AvailableToolsCell, {
        availableTools:
          row.getValue<{ cmd: string; version: string }[]>("available_tools"),
      }),
    // Fix: Return individual tool commands, not the whole objects
    getUniqueValues: (row) => {
      const tools = row.available_tools ?? [];
      return tools.map((tool) => tool.cmd); // Extract just the command names
    },
    // Fix: Add validation for filterValue
    filterFn: (row, filterValue: unknown) => {
      const tools = row.getValue<{ cmd: string }[]>("available_tools") ?? [];

      // Ensure filterValue is an array
      const filterArray = Array.isArray(filterValue) ? filterValue : [];

      console.log("Row tools:", tools);
      console.log("Filter value:", filterArray);
      console.log("Filter value type:", typeof filterValue, filterValue);

      // If no filters selected, show all rows
      if (filterArray.length === 0) return true;

      return tools.some((tool) => filterArray.includes(tool.cmd));
    },
    defaultFilterValue: [],
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
        row.getValue("jobs").length,
      ),
  },
  {
    accessorKey: "actions",
    header: () => h("div", { class: "text-right" }, "Details"),
    cell: ({ row }) => h(ActionsCell, { row }),
  },
];
