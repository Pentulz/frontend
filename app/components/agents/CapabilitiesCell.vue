<script setup lang="ts">
import { Badge } from "#components";

type Props = {
  availableTools?: string[];
};

const props = withDefaults(defineProps<Props>(), {
  availableTools: () => [],
});

const displayedAvailableTools = computed(() => {
  if (props.availableTools.length <= 3) return props.availableTools;

  return [
    ...props.availableTools.slice(0, 2),
    `+${props.availableTools.length - 2}`,
  ];
});
</script>

<template>
  <div class="flex flex-row gap-2">
    <Badge
      v-for="tool in displayedAvailableTools"
      :key="tool"
      variant="outline"
    >
      {{ tool.cmd }}
    </Badge>
  </div>
</template>
