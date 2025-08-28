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
// import JobFilters from "./JobFilters.vue";

type Props = {
  reports: Report[];
};

const { reports } = defineProps<Props>();
</script>
<template>
  <DataTableProvider :columns="columns" :data="reports">
    <!-- <JobFilters /> -->
    <Card>
      <CardHeader>
        <CardTitle class="flex flex-row gap-2 items-center"
          ><FileChartColumnIcon class="size-5" /> Reports List
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable />
      </CardContent>
    </Card>
    <DataTablePagination />
  </DataTableProvider>
</template>
