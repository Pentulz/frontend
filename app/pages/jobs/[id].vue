<script setup lang="ts">
import { JobAgentCard } from "#components";
import JobDetails from "~/components/job/JobDetails.vue";
import DownloadableArtifacts from "~/components/job/DownloadableArtifacts.vue";

definePageMeta({
  breadcrumb: `Job`,
  title: "Job",
});

const route = useRoute();

const { request, job } = useJob(route.params.id as string);

const { error, pending } = request;

useHead({
  title: () => job.value?.name ?? "Loading job...",
});

const artifact = computed(() => {
  if (!job.value?.completed_at || !job.value.results) return undefined;

  return {
    name: job.value.name,
    createdAt: job.value.completed_at,
    results: new Blob([job.value.results], { type: "text/plain" }),
  };
});

const _ = useRefresh([request]);
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

        <template v-else-if="job">
          <h1 class="text-3xl leading-9 font-bold">{{ job.name }}</h1>
          <span class="text-base leading-6 font-normal text-muted-foreground"
            >Job ID: {{ job.id }}</span
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
          <JobDetails v-if="job" :job />
          <DownloadableArtifacts :artifact />
        </template>
      </div>
      <div class="flex flex-col gap-4">
        <template v-if="showSkeleton">
          <Skeleton class="w-full h-[20dvh]" />
          <Skeleton class="w-full h-[50dvh]" />
        </template>

        <template v-else>
          <JobAgentCard v-if="job" :agent-id="job.agent_id" />
        </template>
      </div>
    </div>
  </div>
</template>
