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
import {
  type JsonDocument,
  type ClientError,
  isCollectionDocumentOf,
} from "~/lib/api";

type Props = {
  jobs: Job[];
};

// const { jobs } = defineProps<Props>();

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

const jobs = computed(() => {
  const doc = req.data.value;
  if (!doc) return [];

  if (!isCollectionDocumentOf(doc, "jobs")) return [];

  // Extract the collection items from the document
  return doc.data.map((item) => ({
    id: item.id,
    ...item.attributes,
  }));
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
