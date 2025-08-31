<script setup>
import { PlusIcon } from "lucide-vue-next";
definePageMeta({
  breadcrumb: "Reports",
  title: "Reports",
});

useHead({
  title: "Reports",
});
</script>
<template>
  <div class="flex flex-col w-full gap-4 p-4">
    <div class="flex flex-col lg:flex-row w-full gap-4 lg:justify-between">
      <div class="flex flex-col gap-1">
        <h1 class="text-3xl font-bold text-foreground">Reports</h1>
        <span class="text-muted-foreground"
          >View and manage security assessment reports</span
        >
      </div>
      <Button variant="outline">
        <PlusIcon class="h-6 w-auto" />
        <span>Generate New Report</span>
      </Button>
    </div>

    <!-- Table space -->
    <ReportsTable />
  </div>
</template>
