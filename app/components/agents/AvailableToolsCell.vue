<script setup lang="ts">
import { Badge } from "#components";

type Props = {
  availableTools?: string[];
};

const props = withDefaults(defineProps<Props>(), {
  availableTools: () => [],
});

const displayedAvailableTools = computed(() => props.availableTools);
</script>

<template>
  <div class="grid grid-cols-2 gap-2 auto-rows-auto">
    <Badge
      v-for="tool in displayedAvailableTools"
      :key="tool"
      variant="outline"
      class="w-full justify-center"
    >
      {{ tool.cmd }}
    </Badge>
  </div>
</template>
