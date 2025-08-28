<script setup lang="ts">
import type { Agent } from ".";
import {
  DataTableProvider,
  DataTable,
  DataTablePagination,
} from "../ui/data-table";
import { Card, CardHeader, CardTitle, CardContent } from "#components";
import { ServerIcon } from "lucide-vue-next";
import { columns } from "./columns";
import AgentFilters from "./AgentFilters.vue";

type Props = {
  agents: Agent[];
};

const { agents } = defineProps<Props>();
</script>
<template>
  <DataTableProvider :columns="columns" :data="agents">
    <AgentFilters />
    <Card>
      <CardHeader>
        <CardTitle class="flex flex-row gap-2 items-center"
          ><ServerIcon class="size-5" /> Agents List
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable />
      </CardContent>
    </Card>
    <DataTablePagination />
  </DataTableProvider>
</template>
