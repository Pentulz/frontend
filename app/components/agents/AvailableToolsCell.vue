<script setup lang="ts">
import { Badge } from "#components";
import type { Agent } from "~/composables/use-api";

type Tool = Agent["available_tools"][0];

type Props = {
  availableTools?: Tool[];
};

const { availableTools = [] } = defineProps<Props>();
</script>

<template>
  <div class="flex gap-2 flex-wrap w-64 overflow-hidden">
    <Badge
      v-for="tool in availableTools"
      :key="tool.cmd"
      variant="outline"
      class="block text-start py-1 px-3 truncate max-w-full"
    >
      {{ tool.cmd
      }}<template v-if="tool.version">: {{ tool.version }} </template>
    </Badge>
  </div>
</template>
