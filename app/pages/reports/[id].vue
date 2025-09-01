<script setup lang="ts">
import { type JsonDocument, type ClientError } from "~/lib/api";

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

// Watch for errors
watchEffect(() => {
  if (error.value) {
    const apiErrors = error.value.data?.errors || [];
    if (apiErrors.length) {
      const firstError = apiErrors[0];
      throw createError({
        statusCode: parseInt(firstError.status, 10),
        statusMessage: firstError.detail,
        fatal: true,
      });
    }
  }
});
</script>

<template>
  <div>
    <h1
      class="text-red-500 text-7xl font-semibold absolute flex items-center justify-center inset-0"
    >
      Jobs {{ route?.params.id }}
    </h1>
  </div>
</template>
