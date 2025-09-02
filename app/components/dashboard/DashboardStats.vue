<script setup lang="ts">
import { Card, CardContent } from "#components";

export type StatCard = {
  title: string;
  value: number;
  icon: Component;
};

export type Props = {
  stats?: StatCard[];
};

const props = withDefaults(defineProps<Props>(), {
  stats: () => [],
});
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
    <Card v-for="(stat, index) in props.stats" :key="index" class="p-0">
      <CardContent class="p-6 flex flex-row justify-between items-center">
        <div class="flex flex-col">
          <p class="text-sm font-medium text-muted-foreground">
            {{ stat.title }}
          </p>
          <div class="text-2xl font-bold">
            {{ stat.value }}
          </div>
        </div>
        <component :is="stat.icon" class="size-8" />
      </CardContent>
    </Card>
  </div>
</template>
