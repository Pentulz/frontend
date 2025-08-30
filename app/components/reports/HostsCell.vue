<script setup lang="ts">
import { PcCase } from "lucide-vue-next";

type Props = {
  hosts?: number;
};

const { hosts = undefined } = defineProps<Props>();
</script>

<template>
  <div class="flex flex-row gap-2 items-center">
    <PcCase class="size-4" />
    <span v-if="hosts">{{ hosts }}</span>
    <span v-else>-</span>
  </div>
</template>
