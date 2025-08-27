import { h } from "vue";
import type { Agent } from ".";
import type { ColumnDef } from "@tanstack/vue-table";
import { Button } from "../ui/button";
import { ContainerIcon, EyeIcon } from "lucide-vue-next";
import { NuxtLink } from "#components";
import Header from "../ui/data-table/SortableHeader.vue";
import CapabilitiesCell from "./CapabilitiesCell.vue";
import StatusCell from "./StatusCell.vue";

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
    cell: ({ row }) =>
      h("div", { class: "flex flex-row gap-2 items-center" }, [
        h(ContainerIcon, { class: "h-4 w-auto" }),
        h("span", row.getValue("type")),
      ]),
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
    cell: ({ row }) =>
      h(
        "div",
        { class: "flex flex-row justify-end" },
        h(
          Button,
          { class: "", variant: "ghost", size: "icon", "as-child": true },
          () =>
            h(
              NuxtLink,
              { to: `/agents/${row.original.id}`, "as-child": true },
              () => h(EyeIcon, { class: "h-5 w-auto" }),
            ),
        ),
      ),
  },
];
