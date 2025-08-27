<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef, SortingState } from "@tanstack/vue-table";

import {
  getCoreRowModel,
  useVueTable,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/vue-table";
import { valueUpdater } from "~/lib/utils";

import { provideDataTable } from "./keys";

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}>();

const sorting = ref<SortingState>([]);

const table = useVueTable({
  get data() {
    return props.data;
  },
  get columns() {
    return props.columns;
  },
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  state: {
    get sorting() {
      return sorting.value;
    },
  },
});

provideDataTable(table, props.columns);
</script>

<template>
  <slot />
</template>
