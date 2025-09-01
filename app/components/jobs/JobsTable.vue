<script setup lang="ts">
import {
  DataTableProvider,
  DataTable,
  DataTablePagination,
} from "../ui/data-table";
import { Card, CardHeader, CardTitle, CardContent } from "#components";
import { ClipboardListIcon } from "lucide-vue-next";
import { columns } from "./columns";
import JobFilters from "./JobFilters.vue";
import {
  type JsonDocument,
  type ClientError,
  isCollectionDocumentOf,
} from "~/lib/api";
import type { Job } from ".";

const {
  public: { apiBase },
} = useRuntimeConfig();

const { pending, error, ...req } = useFetch<JsonDocument, ClientError>(
  "/api/v1/jobs",
  {
    server: false,
    lazy: true,
    baseURL: apiBase,
  },
);

const getStatus = (startedAt?: Date, completedAt?: Date): Job["status"] => {
  if (completedAt) return "Completed";
  if (startedAt) return "Running";
  return "Pending";
};

const jobs = computed<Job[]>(() => {
  const doc = req.data.value;
  if (!doc) return [];

  if (!isCollectionDocumentOf(doc, "jobs")) return [];

  // Extract the collection items from the document
  return doc.data.map<Job>(
    ({ id, attributes: { created_at, completed_at, started_at, ...rest } }) => {
      const startedAt = started_at ? new Date(started_at) : undefined;
      const completedAt = completed_at ? new Date(completed_at) : undefined;

      return {
        ...rest,
        id,
        created_at: created_at ? new Date(created_at) : undefined,
        completed_at: completedAt,
        started_at: startedAt,
        status: getStatus(startedAt, completedAt),
      };
    },
  );
});
</script>
<template>
  <DataTableProvider :columns="columns" :data="jobs">
    <JobFilters />
    <Card>
      <CardHeader>
        <CardTitle class="flex flex-row gap-2 items-center"
          ><ClipboardListIcon class="size-5" /> Jobs List
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable />
      </CardContent>
    </Card>
    <DataTablePagination />
  </DataTableProvider>
</template>
