<script setup lang="ts">
import { Badge } from "#components";

type Props = {
  tools: string[];
};

const { tools } = defineProps<Props>();

const displayedTools = computed(() => {
  if (tools.length <= 3) return tools;

  return [...tools.slice(0, 2), `+${tools.length - 2}`];
});
</script>

<template>
  <div class="flex flex-row gap-2">
    <Badge v-for="tool in displayedTools" :key="tool" variant="outline">
      {{ tool }}
    </Badge>
  </div>
</template>
