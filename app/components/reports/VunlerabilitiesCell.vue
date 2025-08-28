<script setup lang="ts">
import { cn } from "~/lib/utils";

type Props = {
  vulnerabilities?: {
    count: number;
    highest: string;
  };
};

const { vulnerabilities = undefined } = defineProps<Props>();

const colors: { [key: string]: string } = {
  Unknown: "text-muted-foreground",
  None: "text-green-600",
  Low: "text-yellow-600",
  Medium: "text-orange-600",
  High: "text-red-600",
  Critical: "text-red-600",
};

const color = computed(
  () => colors[vulnerabilities?.highest ?? 0] ?? "text-muted-foreground",
);
</script>

<template>
  <div class="flex flex-col gap-2">
    <template v-if="vulnerabilities">
      <span>{{ vulnerabilities.count }} total</span>
      <span :class="cn(color)">Highest: {{ vulnerabilities.highest }}</span>
    </template>
    <span v-else>-</span>
  </div>
</template>
