<script setup>
import { PlayIcon } from "lucide-vue-next";
import { data } from "~/assets/data/jobs";
definePageMeta({
  breadcrumb: "Jobs",
  title: "Jobs",
});

useHead({
  title: "Jobs",
});
</script>
<template>
  <div class="flex flex-col w-full gap-4 p-4">
    <div class="flex flex-col lg:flex-row w-full gap-4 lg:justify-between">
      <div class="flex flex-col gap-1">
        <h1 class="text-3xl font-bold text-foreground">Jobs</h1>
        <span class="text-muted-foreground"
          >Manage and monitor all job executions</span
        >
      </div>
      <Button variant="outline">
        <PlayIcon class="h-6 w-auto" />
        <span>Start New Job</span>
      </Button>
    </div>

    <!-- Table space -->
    <JobsTable :jobs="data" />
  </div>
</template>
