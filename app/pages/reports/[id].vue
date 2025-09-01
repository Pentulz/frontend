<script setup lang="ts">
import type { JsonDocument, ClientError } from "~/lib/api";
import { isSingleDocumentOf } from "~/lib/api";

definePageMeta({
  breadcrumb: `Report`,
  title: "Report",
});

const route = useRoute();
const {
  public: { apiBase },
} = useRuntimeConfig();

const { data, pending, error } = useFetch<JsonDocument, ClientError>(
  `/api/v1/reports/${route.params.id}`,
  {
    baseURL: apiBase,
    server: false,
    lazy: false,
  },
);

const doc = computed(() =>
  data.value && isSingleDocumentOf(data.value, "reports")
    ? data.value
    : undefined,
);

const report = computed(() => {
  if (!doc.value) return undefined;

  return {
    ...doc.value.data.attributes,
    id: doc.value.data.id,
  };
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

        <template v-else-if="report">
          <h1 class="text-3xl leading-9 font-bold">{{ report.id }}</h1>
          <span class="text-base leading-6 font-normal text-muted-foreground"
            >Report ID: {{ report.id }}</span
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
          <div>Content</div>
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
