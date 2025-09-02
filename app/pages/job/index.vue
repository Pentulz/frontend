<script setup lang="ts">
import JobDetails from "~/components/job/JobDetails.vue";

definePageMeta({
  breadcrumb: "Job",
  title: "Job",
});
useHead({ title: "Job" });

// mock
const job = {
  description: "Lorem Ipsum Dolor Sit Amet",
  duration: "1h 15m",
  started: "2025-08-22 13:45:00",
  completed: "2025-08-22 15:00:00",
  toolLabel: "nmap:",
  command: "-sS -sV --top-ports 1000 --open 192.168.1.0/24",
};
</script>

<template>
  <div class="flex flex-col w-full gap-4 p-4">
    <JobDetails
      :description="job.description"
      :duration="job.duration"
      :started="job.started"
      :completed="job.completed"
      :tool-label="job.toolLabel"
      :command="job.command"
    />

    <!-- autres cartes (Artifacts, Agent, Timeline) viendront plus tard -->
  </div>
</template>
