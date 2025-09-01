<script setup lang="ts">
import type { JsonDocument, ClientError } from "~/lib/api";

definePageMeta({
  breadcrumb: `Agent`,
  title: "Agent",
});

const route = useRoute();
const {
  public: { apiBase },
} = useRuntimeConfig();

const {
  data: _data,
  pending: _pending,
  error,
} = useFetch<JsonDocument, ClientError>(`/api/v1/agents/${route.params.id}`, {
  baseURL: apiBase,
  server: false,
  lazy: false,
});

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
      Agents {{ route?.params.id }}
    </h1>
  </div>
</template>
