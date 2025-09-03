<script setup>
import { CreateJob } from "~/components/forms";
import { PlayIcon } from "lucide-vue-next";
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
      <CreateJob>
        <Button variant="outline" class="cursor-pointer">
          <PlayIcon class="size-6" />
          <span>Start New Job</span>
        </Button>
      </CreateJob>
    </div>

    <!-- Table space -->
    <JobsTable />
  </div>
</template>
