<script setup lang="ts">
import { Badge } from "#components";
import type { Agent } from ".";

type Tool = Agent["available_tools"][0];

type Props = {
  availableTools?: Tool[];
};

const { availableTools = [] } = defineProps<Props>();

const displayedAvailableTools = computed<Tool[]>(() => {
  if (availableTools.length <= 3) return availableTools;

  return [
    ...availableTools.slice(0, 2),
    {
      cmd: `+${availableTools.length - 2}`,
      args: [],
      version: undefined,
    },
  ];
});
</script>

<template>
  <div class="flex flex-row gap-2">
    <Badge
      v-for="tool in displayedAvailableTools"
      :key="tool.cmd"
      variant="outline"
    >
      {{ tool.cmd }}<span v-if="tool.version">: {{ tool.version }}</span>
    </Badge>
  </div>
</template>
