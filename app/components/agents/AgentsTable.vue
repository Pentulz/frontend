<script setup lang="ts">
import {
  DataTableProvider,
  DataTable,
  DataTablePagination,
} from "../ui/data-table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "#components";
import { ServerIcon } from "lucide-vue-next";
import { columns } from "./columns";
import AgentFilters from "./AgentFilters.vue";

const { request, agents } = useAgents();

const { pending, error } = request;

const _ = useRefresh([request]);
</script>
<template>
  <DataTableProvider :columns :data="agents">
    <AgentFilters />
    <Card>
      <CardHeader>
        <CardTitle class="flex flex-row gap-2 items-center"
          ><ServerIcon class="size-5" /> Agents List
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable :pending />
      </CardContent>
      <CardFooter v-if="error">
        <div
          v-for="err in error.data?.errors"
          :key="err.detail"
          class="text-red-500"
        >
          {{ err.status }} {{ err.title }}
        </div>
      </CardFooter>
    </Card>
    <DataTablePagination />
  </DataTableProvider>
</template>
