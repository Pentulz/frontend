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
import type { Agent } from "~/composables/use-api";

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
  const doc = req.data.value;
  if (!doc) return [];

  if (!isCollectionDocumentOf(doc, "agents")) return [];

  // Extract the collection items from the document
  return doc.data.map<Agent>(
    ({ id, attributes: { last_seen_at, created_at, ...rest } }) => ({
      ...rest,
      id,
      last_seen_at: last_seen_at ? new Date(last_seen_at) : undefined,
      created_at: created_at ? new Date(created_at) : undefined,
    }),
  );
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
