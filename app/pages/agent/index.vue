<script setup lang="ts">
import AgentDetails from "~/components/agent/AgentDetails.vue";
import AgentRecentJobs from "~/components/agent/AgentRecentJobs.vue";
import AgentQuickActions from "~/components/agent/AgentQuickActions.vue";
import AgentCapabilities from "~/components/agent/AgentCapabilities.vue";

definePageMeta({
  breadcrumb: "Agent",
  title: "Agent",
});

useHead({ title: "Agent" });

/** -------- Mock data (frontend only) -------- */
const agent = {
  id: "agent-007",
  name: "James Bond",
  description: "Lorem Ipsum Dolor Sit Amet",
  type: "Container",
  os: "Ubuntu 24.04",
  ip: "10.0.0.7",
  uptime: "15d 8h 32m",
  lastSeen: "2025-08-23 15:00:00",
  tags: ["production", "LTS"],
};

const jobs = [
  { id: "123", name: "Network Scan - Prod", subtitle: "job-123", status: "completed", duration: "1h 15m", startedAt: "2025-08-22 19:23:99", href: "/jobs/123" },
  { id: "124", name: "Network Scan - Prod", subtitle: "job-123", status: "completed", duration: "1h 15m", startedAt: "2025-08-22 19:23:99", href: "/jobs/124" },
  { id: "125", name: "Network Scan - Prod", subtitle: "job-123", status: "completed", duration: "1h 15m", startedAt: "2025-08-22 19:23:99", href: "/jobs/125" },
] as const;

const capabilities = {
  networkTools: [
    { name: "nmap", version: "7.97", ok: true },
    { name: "wireshark", version: "4.9.5", ok: false },
    { name: "tcpdump", version: "4.99.5", ok: true },
    { name: "netcat", version: "0.71", ok: true },
  ],
  scripting: [
    { name: "python", version: "3.11.6", ok: true },
    { name: "bash", version: "5.3.0", ok: true },
    { name: "nodejs", version: "24.2.0", ok: true },
    { name: "powershell", version: "7.4.0", ok: false },
  ],
};
</script>

<template>
  <div class="flex flex-col w-full gap-4 p-4">
    <!-- Header -->
    <div class="flex flex-col lg:flex-row w-full gap-4 lg:justify-between">
      <div class="flex flex-col gap-1">
        <h1 class="text-3xl font-bold text-foreground">{{ agent.name }}</h1>
        <span class="text-muted-foreground">Agent ID: {{ agent.id }}</span>
      </div>
      <div class="hidden md:flex items-center gap-2">
        <span class="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs">
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
          :description="agent.description"
          :type="agent.type"
          :os="agent.os"
          :ip="agent.ip"
          :uptime="agent.uptime"
          :last-seen="agent.lastSeen"
          :tags="agent.tags"
        />

        <AgentRecentJobs :jobs="jobs" />
      </div>

      <!-- Colonne droite -->
      <div class="flex flex-col gap-4">
        <AgentQuickActions />

        <AgentCapabilities
          :network-tools="capabilities.networkTools"
          :scripting="capabilities.scripting"
        />
      </div>
    </div>
  </div>
</template>
