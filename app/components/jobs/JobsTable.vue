<script setup lang="ts">
import type { Job } from ".";
import {
  DataTableProvider,
  DataTable,
  DataTablePagination,
} from "../ui/data-table";
import { Card, CardHeader, CardTitle, CardContent } from "#components";
import { ClipboardListIcon } from "lucide-vue-next";
import { columns } from "./columns";
import JobFilters from "./JobFilters.vue";

type Props = {
  jobs: Job[];
};

const { jobs } = defineProps<Props>();
</script>
<template>
  <DataTableProvider :columns="columns" :data="jobs">
    <JobFilters />
    <Card>
      <CardHeader>
        <CardTitle class="flex flex-row gap-2 items-center"
          ><ClipboardListIcon class="size-5" /> Agents List
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable />
      </CardContent>
    </Card>
    <DataTablePagination />
  </DataTableProvider>
</template>
