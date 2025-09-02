<script setup lang="ts">
import { Skeleton } from "~/components/ui/skeleton";
import type { Job } from "~/composables/use-api";
import type { AgentDetails } from "~/components/agent/AgentDetails.vue";

definePageMeta({
  breadcrumb: `Agent`,
  title: "Agent",
});

const route = useRoute();

const {
  request: { error, pending },
  agent,
} = useAgent(route.params.id as string);

const agentDetails = computed<AgentDetails>(() => {
  return agent.value as AgentDetails;
});

const recentJobs = computed<Job[]>(() => {
  if (!agent.value) return [];

  return agent.value.jobs
    .slice(0, 5)
    .map<Job>(({ id, created_at, completed_at, started_at, ...rest }) => {
      const startedAt = started_at ? new Date(started_at) : undefined;
      const completedAt = completed_at ? new Date(completed_at) : undefined;

      return {
        ...rest,
        id,
        created_at: created_at ? new Date(created_at) : undefined,
        completed_at: completedAt,
        started_at: startedAt,
        status: getStatus(startedAt, completedAt),
      };
    });
});

useBackendError(error);
const showSkeleton = useSkeleton(pending);
</script>

<template>
  <div class="flex flex-col w-full gap-4 p-4">
    <div class="flex flex-row w-full justify-between">
      <div class="flex flex-col gap-1">
        <template v-if="showSkeleton">
          <Skeleton class="h-9 w-48 max-w-full" />
          <Skeleton class="h-6 w-96 max-w-full" />
        </template>

        <template v-else-if="agent">
          <h1 class="text-3xl leading-9 font-bold">{{ agent.name }}</h1>
          <span class="text-base leading-6 font-normal text-muted-foreground"
            >Agent ID: {{ agent.id }}</span
          >
        </template>
      </div>
    </div>
    <div class="flex flex-col lg:grid lg:grid-cols-2 2xl:grid-cols-3 gap-4">
      <div class="flex flex-col 2xl:col-span-2 gap-4">
        <template v-if="showSkeleton">
          <Skeleton class="w-full h-[40dvh]" />
          <Skeleton class="w-full h-[30dvh]" />
        </template>

        <template v-else>
          <AgentDetails :agent="agentDetails" />
          <AgentRecentJobs :jobs="recentJobs" />
        </template>
      </div>
      <div class="flex flex-col gap-4">
        <template v-if="showSkeleton">
          <Skeleton class="w-full h-[20dvh]" />
          <Skeleton class="w-full h-[50dvh]" />
        </template>

        <template v-else>
          <div>Content</div>
        </template>
      </div>
    </div>
  </div>
</template>
