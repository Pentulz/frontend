<script setup lang="ts">
import type { Agent } from ".";
import { DataTableProvider, DataTable } from "../ui/data-table";
import { columns } from "./columns";
type Props = {
  agents: Agent[];
};

const { agents } = defineProps<Props>();
</script>
<template>
  <DataTableProvider :columns="columns" :data="agents">
    <DataTable />
  </DataTableProvider>
</template>
