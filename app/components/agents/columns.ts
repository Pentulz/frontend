import { h } from "vue";
import type { Agent } from ".";
import type { ColumnDef } from "@tanstack/vue-table";
import { Badge } from "~/components/ui/badge";
import { Button } from "../ui/button";
import { CircleCheckBigIcon, ContainerIcon, EyeIcon } from "lucide-vue-next";
import { NuxtLink } from "#components";

export const columns: ColumnDef<Agent>[] = [
  {
    accessorKey: "name",
    header: () => h("div", { class: "" }, "Agent Name"),
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
    header: () => "Status",
    cell: ({ row }) =>
      h(Badge, { variant: "default" }, () => [
        h(CircleCheckBigIcon, { class: "h-4 w-auto" }),
        row.getValue("status"),
      ]),
  },
  {
    accessorKey: "type",
    header: () => "Type",
    cell: ({ row }) =>
      h("div", { class: "flex flex-row gap-2 items-center" }, [
        h(ContainerIcon, { class: "h-4 w-auto" }),
        h("span", row.getValue("type")),
      ]),
  },
  {
    accessorKey: "ip",
    header: () => h("div", { class: "" }, "IP Address"),
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
    accessorKey: "jobs",
    header: () => h("div", { class: "text-right" }, "Jobs"),
    cell: ({ row }) => h("div", { class: "text-right" }, row.getValue("jobs")),
  },
  {
    accessorKey: "actions",
    header: () => h("div", { class: "text-right" }, "Actions"),
    cell: ({ row }) =>
      h("div", { class: "flex flex-row justify-end" }, [
        h(
          Button,
          { class: "", variant: "ghost", size: "icon", "as-child": true },
          h(
            NuxtLink,
            { to: `/agents/${row.original.id}`, "as-child": true },
            h(EyeIcon, { class: "h-5 w-auto" }),
          ),
        ),
      ]),
  },
];
