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
import {
  type JsonDocument,
  type ClientError,
  isCollectionDocumentOf,
} from "~/lib/api";
import { agents } from "~/assets/data/agents";

const {
  public: { apiBase },
} = useRuntimeConfig();

const { pending, error, ...req } = useFetch<JsonDocument, ClientError>(
  "/api/v1/agents",
  {
    server: false,
    lazy: true,
    baseURL: apiBase,
  },
);

const data = computed(() => {
  if (!req.data.value) return [];

  if (!isCollectionDocumentOf(req.data.value, "agents")) return [];

  // TODO: proprely map the values
  return agents;
});
</script>
<template>
  <DataTableProvider :columns :data>
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
