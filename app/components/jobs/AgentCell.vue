<script setup lang="ts">
type Props = {
  agentId: string;
};

const { agentId } = defineProps<Props>();

const to = computed(() => `/agents/${agentId}`);
</script>

<template>
  <NuxtLink :to class="text-sm text-blue-600 hover:text-blue-800">{{
    agentId
  }}</NuxtLink>
</template>
