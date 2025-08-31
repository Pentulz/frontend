<script setup lang="ts">
import type { Report } from ".";
import {
  DataTableProvider,
  DataTable,
  DataTablePagination,
} from "../ui/data-table";
import { Card, CardHeader, CardTitle, CardContent } from "#components";
import { FileChartColumnIcon, AlertCircleIcon } from "lucide-vue-next";
import { columns } from "./columns";
import ReportFilters from "./ReportFilters.vue";
import {
  type ClientError,
  type JsonDocument,
  isCollectionDocumentOf,
} from "~/lib/api";

const config = useRuntimeConfig();

const { data, pending } = useFetch<JsonDocument, ClientError>(
  "/api/v1/reports",
  {
    server: false,
    lazy: true,
    baseURL: config.public.apiBase,
  },
);

const doc = computed(() =>
  data.value && isCollectionDocumentOf(data.value, "reports")
    ? data.value
    : null,
);

const reports = computed<Report[]>(() => {
  if (!doc.value) return [];

  return doc.value.data.map<Report>(
    ({
      id,
      attributes: {
        created_at,
        results: { risk_level = null, status = null },
      },
    }) => ({
      id: id,
      created_at: created_at ? new Date(created_at) : null,
      risk_level: risk_level,
      status: status,
    }),
  );
});
</script>
<template>
  <DataTableProvider :columns="columns" :data="reports">
    <ReportFilters />
    <Card>
      <CardHeader>
        <CardTitle class="flex flex-row gap-2 items-center"
          ><FileChartColumnIcon class="size-5" /> Reports List
        </CardTitle>
      </CardHeader>
      <CardContent class="flex flex-col gap-4">
        <DataTable :pending />
        <Alert v-if="!doc" variant="destructive" class="w-fit mx-auto">
          <AlertCircleIcon class="size-5" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription
            >Unexpected API response when fetching reports</AlertDescription
          >
        </Alert>
      </CardContent>
    </Card>
    <DataTablePagination />
  </DataTableProvider>
</template>
