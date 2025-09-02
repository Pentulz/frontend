<script setup lang="ts">
import {
  useAgents,
  useJobs,
  useReports,
  type Report,
} from "~/composables/use-api";
import type { StatCard } from "~/components/dashboard/DashboardStats.vue";
import type { RecentJob } from "~/components/dashboard/DashboardRecentJobs.vue";
import {
  ActivityIcon,
  ServerIcon,
  FileChartColumnIcon,
  TrendingUpIcon,
} from "lucide-vue-next";
import type { ActiveAgent } from "~/components/dashboard/DashboardActiveAgents.vue";
import { interval, intervalToDuration, formatDistanceToNow } from "date-fns";
import type { RecentReport } from "~/components/dashboard/DashboardRecentReports.vue";

definePageMeta({
  breadcrumb: "Dashboard",
  title: "Dashboard",
});

useHead({
  title: "Dashboard",
});

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

const getAgentStatus = ({ last_seen_at, jobs }: Agent) => {
  if (!last_seen_at) return "offline";

  if (jobs.some((job) => job.started_at && !job.completed_at)) return "busy";

  const duration = intervalToDuration(interval(last_seen_at, new Date()));

  if (!duration.minutes) return "offline";

  return duration.minutes < 20 ? "idle" : "offline";
};

const activeAgents = computed<ActiveAgent[]>(() =>
  // TODO: Filter by latest
  agents.value.slice(0, 3).map<ActiveAgent>((agent) => {
    return {
      ...agent,
      status: getAgentStatus(agent),
    };
  }),
);

const getMaxSeverity = (
  distribution: Report["results"]["summary"]["severity_distribution"],
): "critical" | "high" | "medium" | "low" | "info" => {
  if (distribution.critical) return "critical";

  if (distribution.high) return "high";

  if (distribution.medium) return "medium";

  return distribution.low ? "low" : "info";
};

const recentReports = computed<RecentReport[]>(() =>
  // TODO: Filter by latest
  reports.value
    .slice(0, 3)
    .map<RecentReport>(({ name, id, created_at, results: { summary } }) => {
      return {
        name,
        id,
        severity: getMaxSeverity(summary.severity_distribution),
        vulnerabilities: summary.total_findings,
        created: created_at
          ? formatDistanceToNow(created_at, { addSuffix: true })
          : "",
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

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <template v-if="jobsSkeleton || agentsSkeleton">
        <Skeleton v-for="i in 2" :key="i" class="h-[25.5rem] rounded-xl" />
      </template>
      <template v-else>
        <DashboardRecentJobs :jobs="recentJobs" />
        <DashboardActiveAgents :agents="activeAgents" />
      </template>
    </div>

    <Skeleton v-if="reportsSkeleton" class="h-[15rem] rounded-xl" />
    <DashboardRecentReports v-else :reports="recentReports" />
  </div>
</template>
