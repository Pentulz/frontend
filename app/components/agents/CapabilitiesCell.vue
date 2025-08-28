<script setup lang="ts">
import { Badge } from "#components";

type Props = {
  capabilities: string[];
};

const { capabilities } = defineProps<Props>();

const displayedCapabilities = computed(() => {
  if (capabilities.length <= 3) return capabilities;

  return [...capabilities.slice(0, 2), `+${capabilities.length - 2}`];
});
</script>

<template>
  <div class="flex flex-row gap-2">
    <Badge
      v-for="capability in displayedCapabilities"
      :key="capability"
      variant="outline"
    >
      {{ capability }}
    </Badge>
  </div>
</template>
