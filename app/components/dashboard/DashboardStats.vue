<script setup lang="ts">
import { Card, CardContent } from "#components";

export type StatCard = {
  title: string;
  value: number;
};

export type Props = {
  stats?: StatCard[];
};

const props = withDefaults(defineProps<Props>(), {
  stats: () => []
});
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
    <Card v-for="(stat, index) in props.stats" :key="index">
      <CardContent class="p-6">
        <p class="text-sm font-medium text-muted-foreground mb-1">
          {{ stat.title }}
        </p>
        <div class="text-2xl font-bold">
          {{ stat.value }}
        </div>
      </CardContent>
    </Card>
  </div>
</template>