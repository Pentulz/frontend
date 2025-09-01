<script setup lang="ts">
import { Badge } from "#components";

type Props = {
  action: string;
};

const { action } = defineProps<Props>();
</script>

<template>
  <div class="flex flex-row gap-2">
    <Badge :key="action" variant="outline">
      {{ action.cmd }}
      {{ action.args.join(" ") }}
    </Badge>
  </div>
</template>
