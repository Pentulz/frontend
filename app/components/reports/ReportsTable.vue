<script setup lang="ts">
import {
  DataTableProvider,
  DataTable,
  DataTablePagination,
} from "../ui/data-table";
import { Card, CardHeader, CardTitle, CardContent } from "#components";
import { FileChartColumnIcon, AlertCircleIcon } from "lucide-vue-next";
import { columns } from "./columns";
import ReportFilters from "./ReportFilters.vue";

const { request, doc, reports } = useReports();
const { error, pending } = request;
const _ = useRefresh([request]);
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
        <Alert v-if="!doc || error" variant="destructive" class="w-fit mx-auto">
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
