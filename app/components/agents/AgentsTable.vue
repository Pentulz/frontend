<script setup lang="ts">
import type { Agent } from ".";
import DataTable from "../ui/data-table/DataTable.vue";
import { columns } from "./columns";
type Props = {
  agents: Agent[];
};

const { agents } = defineProps<Props>();
</script>
<template>
  <DataTable :columns="columns" :data="agents" />
</template>
