<script setup lang="ts">
import MergedArtifacts from "~/components/report/MergedArtifacts.vue";
import VulnerabilitiesFound from "~/components/report/VulnerabilitiesFound.vue";

definePageMeta({
  breadcrumb: `Report`,
  title: "Report",
});

const route = useRoute();

const {
  request: { error, pending },
  report,
} = useReport(route.params.id as string);

const {
  request: { pending: jobsPending },
  jobs,
} = useJobs();

useBackendError(error);
const showSkeleton = useSkeleton(pending);
const jobsSkeleton = useSkeleton(jobsPending);

const artifacts = computed(() => {
  if (!report.value?.results.metadata.jobs_ids) return [];

  const job_ids = report.value.results.metadata.jobs_ids;

  return jobs.value
    .filter((job) => job_ids.includes(job.id) && job.results)
    .map(({ id, results, name }) => {
      return {
        name,
        id,
        results: new Blob([results as string], { type: "text/plain" }),
      };
    });
});
</script>

<template>
  <div class="flex flex-col w-full gap-4 p-4">
    <div class="flex flex-row w-full justify-between">
      <div class="flex flex-col gap-1">
        <template v-if="showSkeleton">
          <Skeleton class="h-9 w-48 max-w-full" />
          <Skeleton class="h-6 w-96 max-w-full" />
        </template>

        <template v-else-if="report">
          <h1 class="text-3xl leading-9 font-bold capitalize">
            {{ report.name }}
          </h1>
          <span class="text-base leading-6 font-normal text-muted-foreground"
            >Report ID: {{ report.id }}</span
          >
        </template>
      </div>
    </div>
    <div class="flex flex-col lg:grid lg:grid-cols-2 2xl:grid-cols-3 gap-4">
      <div class="flex flex-col 2xl:col-span-2 gap-4">
        <template v-if="showSkeleton || jobsSkeleton || !report">
          <Skeleton class="w-full h-[40dvh]" />
          <Skeleton class="w-full h-[30dvh]" />
        </template>

        <template v-else>
          <ReportSummary v-if="report" :report />
          <MergedArtifacts :artifacts />
        </template>
      </div>
      <div class="flex flex-col gap-4">
        <template v-if="showSkeleton">
          <Skeleton class="w-full h-[70dvh]" />
        </template>

        <template v-else>
          <VulnerabilitiesFound :finding="report?.results.all_findings ?? []" />
        </template>
      </div>
    </div>
  </div>
</template>
