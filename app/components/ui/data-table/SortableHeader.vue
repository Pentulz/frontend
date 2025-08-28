<script setup lang="ts" generic="TData, TValue">
import type { Column } from "@tanstack/vue-table";
import type { HTMLAttributes } from "vue";
import { ArrowUpDownIcon, ArrowUpIcon, ArrowDownIcon } from "lucide-vue-next";
import { cn } from "~/lib/utils";

interface Props {
  column: Column<TData, TValue>;
  class?: HTMLAttributes["class"];
}

const { column, ...rest } = defineProps<Props>();

const icon = computed(() => {
  const sort = column.getIsSorted();

  if (!sort) return ArrowUpDownIcon;

  return sort === "asc" ? ArrowDownIcon : ArrowUpIcon;
});
</script>
<template>
  <Button
    variant="ghost"
    :class="cn('w-full items-center justify-start gap-2', rest.class)"
    @click="() => column.toggleSorting(column.getIsSorted() === 'asc')"
  >
    <slot />
    <component :is="icon" class="w-4 h-4" />
  </Button>
</template>
