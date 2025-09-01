<script setup lang="ts">
import { Badge } from "#components";
import type { Agent } from ".";

type Tool = Agent["available_tools"][0];

type Props = {
  availableTools?: Tool[];
};

const { availableTools = [] } = defineProps<Props>();
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-2 auto-rows-auto">
    <Badge
      v-for="tool in availableTools"
      :key="tool.cmd"
      variant="outline"
      class="w-full justify-center py-1 px-3"
    >
      {{ tool.cmd }}<span v-if="tool.version">: {{ tool.version }}</span>
    </Badge>
  </div>
</template>
