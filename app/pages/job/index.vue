<script setup lang="ts">
import JobDetails from "~/components/job/JobDetails.vue";
import DownloadableArtifacts from "~/components/job/DownloadableArtifacts.vue";
import JobAgentCard from "~/components/job/JobAgentCard.vue";

definePageMeta({
  breadcrumb: "Job",
  title: "Job",
});
useHead({ title: "Job" });

// --- Mock data ---
const job = {
  title: "Nmap scanning for xyz",
  id: "job-007",
  description: "Lorem Ipsum Dolor Sit Amet",
  duration: "1h 15m",
  started: "2025-08-22 13:45:00",
  completed: "2025-08-22 15:00:00",
  toolLabel: "nmap:",
  command: "-sS -sV --top-ports 1000 --open 192.168.1.0/24",
};

const artifacts = [
  { name: "nmap_scan.xml", type: "data", size: "45.2 MB", created: "2025-08-22 19:23:99", href: "#" },
  { name: "nmap_scan_logs.txt", type: "logs", size: "45.2 MB", created: "2025-08-22 19:23:99", href: "#" },
  { name: "something_really_long_to_truncat_just_in_….log", type: "logs", size: "45.2 MB", created: "2025-08-22 19:23:99", href: "#" },
];

const agent = {
  name: "James Bond",
  id: "agent-007",
  status: "Online" as const,
  type: "Container",
  ip: "10.0.0.7",
};
</script>

<template>
  <div class="flex flex-col w-full gap-4 p-4">
    <!-- Header simple (optionnel, garde si tu veux) -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold">{{ job.title }}</h1>
        <span class="text-muted-foreground">Job ID: {{ job.id }}</span>
      </div>
    </div>

    <!-- 2 colonnes comme sur le mockup -->
    <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
      <!-- Colonne gauche -->
      <div class="flex flex-col gap-4 2xl:col-span-2">
        <JobDetails
          :description="job.description"
          :duration="job.duration"
          :started="job.started"
          :completed="job.completed"
          :tool-label="job.toolLabel"
          :command="job.command"
        />

        <DownloadableArtifacts :artifacts="artifacts" />
      </div>

      <!-- Colonne droite -->
      <div class="flex flex-col gap-4">
        <JobAgentCard
            :id="agent.id"
            :name="agent.name"
            :status="agent.status"
            :type="agent.type"
            :ip="agent.ip"
        />

        <!-- (Timeline viendra plus tard) -->
      </div>
    </div>
  </div>
</template>
