<script setup lang="ts">
import JobDetails from "~/components/job/JobDetails.vue";
import DownloadableArtifacts from "~/components/job/DownloadableArtifacts.vue";

definePageMeta({
  breadcrumb: "Job",
  title: "Job",
});
useHead({ title: "Job" });

// mock job details
const job = {
  description: "Lorem Ipsum Dolor Sit Amet",
  duration: "1h 15m",
  started: "2025-08-22 13:45:00",
  completed: "2025-08-22 15:00:00",
  toolLabel: "nmap:",
  command: "-sS -sV --top-ports 1000 --open 192.168.1.0/24",
};

// mock artifacts
const artifacts = [
  { name: "nmap_scan.xml", type: "data", size: "45.2 MB", created: "2025-08-22 19:23:99" },
  { name: "nmap_scan_logs.txt", type: "logs", size: "45.2 MB", created: "2025-08-22 19:23:99" },
  { name: "something_really_long_to_truncat_just_in_….log", type: "logs", size: "45.2 MB", created: "2025-08-22 19:23:99" },
];

// mock recent jobs
const jobs = [
  {
    id: "123",
    name: "Network Scan - Prod",
    subtitle: "job-123",
    status: "completed",
    duration: "1h 15m",
    startedAt: "2025-08-22 19:23:99",
    href: "#",
  },
  {
    id: "124",
    name: "Network Scan - Staging",
    subtitle: "job-124",
    status: "running",
    duration: "30m",
    startedAt: "2025-08-22 20:10:00",
    href: "#",
  },
  {
    id: "125",
    name: "Port Scan",
    subtitle: "job-125",
    status: "failed",
    duration: "5m",
    startedAt: "2025-08-22 18:40:00",
    href: "#",
  },
];
</script>

<template>
  <div class="flex flex-col w-full gap-4 p-4">
    <!-- Job details -->
    <JobDetails
      :description="job.description"
      :duration="job.duration"
      :started="job.started"
      :completed="job.completed"
      :tool-label="job.toolLabel"
      :command="job.command"
    />

    <!-- Downloadable artifacts -->
    <DownloadableArtifacts :artifacts="artifacts" />

    <!-- Recent jobs -->
    <RecentJobs :jobs="jobs" />
  </div>
</template>
