<script setup lang="ts">
import type { Report } from ".";
import {
  DataTableProvider,
  DataTable,
  DataTablePagination,
} from "../ui/data-table";
import { Card, CardHeader, CardTitle, CardContent } from "#components";
import { FileChartColumnIcon } from "lucide-vue-next";
import { columns } from "./columns";
import ReportFilters from "./ReportFilters.vue";
import type { CollectionDocument, ClientError } from "~/lib/api";

const config = useRuntimeConfig();

const { data, pending } = useFetch<CollectionDocument<"reports">, ClientError>(
  "/api/v1/reports",
  {
    server: false,
    lazy: true,
    baseURL: config.public.apiBase,
  },
);

const reports = computed<Report[]>(() => {
  if (!data.value) return [];

  return data.value.data.map<Report>(
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
      <CardContent>
        <DataTable :pending />
      </CardContent>
    </Card>
    <DataTablePagination />
  </DataTableProvider>
</template>
