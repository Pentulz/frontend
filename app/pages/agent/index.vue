<script setup lang="ts">
import { CreateAgent } from "~/components/forms";
import AgentDetails from "~/components/agent/AgentDetails.vue";
import AgentRecentJobs from "~/components/agent/AgentRecentJobs.vue";
import AgentQuickActions from "~/components/agent/AgentQuickActions.vue";

definePageMeta({
  breadcrumb: "Agents",
  title: "Agents",
});

useHead({ title: "Agents" });

// Mock agent (ex: James Bond)
const mock = {
  description: "Lorem Ipsum Dolor Sit Amet",
  type: "Container",
  os: "Ubuntu 24.04",
  ip: "10.0.0.7",
  uptime: "15d 8h 32m",
  lastSeen: "2025-08-23 15:00:00",
  tags: ["production", "LTS"],
};

// Mock jobs
const jobs = [
  {
    id: "123",
    name: "Network Scan - Prod",
    subtitle: "job-123",
    status: "completed",
    duration: "1h 15m",
    startedAt: "2025-08-22 19:23:99",
    href: "/jobs/123",
  },
  {
    id: "124",
    name: "Network Scan - Prod",
    subtitle: "job-123",
    status: "completed",
    duration: "1h 15m",
    startedAt: "2025-08-22 19:23:99",
    href: "/jobs/124",
  },
  {
    id: "125",
    name: "Network Scan - Prod",
    subtitle: "job-123",
    status: "completed",
    duration: "1h 15m",
    startedAt: "2025-08-22 19:23:99",
    href: "/jobs/125",
  },
] as const;
</script>

<template>
  <div class="flex flex-col w-full gap-4 p-4">
    <!-- Header -->
    <div class="flex flex-col lg:flex-row w-full gap-4 lg:justify-between">
      <div class="flex flex-col gap-1">
        <h1 class="text-3xl font-bold text-foreground">James Bond</h1>
        <span class="text-muted-foreground">Agent ID: agent-007</span>
      </div>
      <div class="hidden md:flex items-center gap-2">
        <span
          class="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs"
        >
          <span class="w-2 h-2 rounded-full bg-emerald-500" /> Active
        </span>
        <button class="border rounded-md px-3 py-2 text-sm">New job</button>
      </div>
    </div>

    <!-- Main layout -->
    <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
      <!-- Colonne principale -->
      <div class="flex flex-col gap-4 2xl:col-span-2">
        <AgentDetails
          :description="mock.description"
          :type="mock.type"
          :os="mock.os"
          :ip="mock.ip"
          :uptime="mock.uptime"
          :last-seen="mock.lastSeen"
          :tags="mock.tags"
        />

        <AgentRecentJobs :jobs="jobs" />
      </div>

      <!-- Colonne droite -->
      <div class="flex flex-col gap-4">
        <AgentQuickActions />

        <div class="border rounded p-4">
          <div class="font-medium mb-2">Agent Capabilities</div>
          <div class="text-sm text-muted-foreground">Mock section (à faire)</div>
        </div>
      </div>
    </div>
  </div>
</template>
