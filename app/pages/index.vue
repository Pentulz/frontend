<script setup lang="ts">
import { useAgents, useJobs, useReports } from "~/composables/use-api";
import type { StatCard } from "~/components/dashboard/DashboardStats.vue";
import type { RecentJob } from "~/components/dashboard/DashboardRecentJobs.vue";
import {
  ActivityIcon,
  ServerIcon,
  FileChartColumnIcon,
  TrendingUpIcon,
} from "lucide-vue-next";

definePageMeta({
  breadcrumb: "Dashboard",
  title: "Dashboard",
});

useHead({
  title: "Dashboard",
});

// Données des agents actifs
const activeAgents = [
  {
    name: "James Bond",
    status: "busy",
    type: "Container",
    ip: "10.0.0.7",
    os: "Kali 24",
    tools: 3,
  },
  {
    name: "Workstation XYZ",
    status: "idle",
    type: "Workstation",
    ip: "192.168.1.32",
    os: "Ubuntu 24.04",
    tools: 2,
  },
  {
    name: "Johnny English",
    status: "offline",
    type: "Workstation",
    ip: "169.254.254.254",
    os: "Windows Server",
    tools: 1,
  },
];

// Données des rapports récents
const recentReports = [
  {
    name: "Q1 Security Assessment",
    status: "completed",
    hostsFound: 45,
    vulnerabilities: 12,
    severity: "high",
    created: "2025-08-23",
  },
  {
    name: "Network Infrastructure Audit",
    status: "processing",
    hostsFound: 23,
    vulnerabilities: 5,
    severity: "medium",
    created: "2025-08-23",
  },
  {
    name: "Web Application Scan",
    status: "completed",
    hostsFound: 8,
    vulnerabilities: 3,
    severity: "low",
    created: "2025-08-23",
  },
];

const { request: agentsRequest, doc: _agentsDoc, agents } = useAgents();
const { request: jobsRequest, doc: _jobsDoc, jobs } = useJobs();
const { request: reportsRequest, doc: _reportsDoc, reports } = useReports();

const agentsSkeleton = useSkeleton(agentsRequest.pending);
const jobsSkeleton = useSkeleton(jobsRequest.pending);
const reportsSkeleton = useSkeleton(reportsRequest.pending);

const stats = computed<StatCard[]>(() => [
  {
    title: "Total Jobs",
    value: jobs.value.length,
    icon: ActivityIcon,
  },
  {
    title: "Active Agents",
    // TODO: Check if seen 20 mins ago
    value: agents.value.map(({ last_seen_at }) => last_seen_at).filter(Boolean)
      .length,
    icon: ServerIcon,
  },
  {
    title: "Reports Generated",
    value: reports.value.length,
    icon: FileChartColumnIcon,
  },
  {
    title: "Running Jobs",
    value: jobs.value.filter(({ status }) => status === "Running").length,
    icon: TrendingUpIcon,
  },
]);

const recentJobs = computed<RecentJob[]>(() =>
  // TODO: Filter by latest
  jobs.value.slice(0, 3).map<RecentJob>(({ agent_id, ...job }) => {
    return {
      ...job,
      agent: agents.value.find(({ id }) => id === agent_id)?.name ?? "",
    };
  }),
);
</script>

<template>
  <div class="flex flex-col w-full gap-4 p-4">
    <div class="flex flex-row w-full justify-between">
      <div class="flex flex-col gap-1">
        <h1 class="text-3xl leading-9 font-bold">Dashboard</h1>
        <span class="text-base leading-6 font-normal text-muted-foreground">
          Overview of jobs, runners, and reports
        </span>
      </div>
    </div>

    <template v-if="agentsSkeleton || jobsSkeleton || reportsSkeleton">
      <div
        class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 py-[1px]"
      >
        <Skeleton v-for="i in 4" :key="i" class="h-[6.25rem] rounded-xl" />
      </div>
    </template>

    <DashboardStats v-else :stats />

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <template v-if="jobsSkeleton || agentsSkeleton">
        <Skeleton v-for="i in 2" :key="i" class="h-[26rem]" />
      </template>
      <template v-else>
        <DashboardRecentJobs :jobs="recentJobs" />
        <DashboardActiveAgents :agents="activeAgents" />
      </template>
    </div>

    <DashboardRecentReports :reports="recentReports" />
  </div>
</template>
