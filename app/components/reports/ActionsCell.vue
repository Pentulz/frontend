<script setup lang="ts">
import type { Row } from "@tanstack/vue-table";
import type { Report } from ".";
import { Eye, Download } from "lucide-vue-next";

type Props = {
  row: Row<Report>;
};

const { row } = defineProps<Props>();

const to = computed(() => `/reports/${row.original.id}`);
</script>

<template>
  <div class="flex w-full justify-end">
    <div class="flex flex-row justify-start gap-2">
      <Button variant="ghost" size="icon" as-child>
        <NuxtLink :to>
          <Eye class="h-5 w-auto" />
        </NuxtLink>
      </Button>

      <Button
        v-if="row.original.status === 'completed'"
        variant="ghost"
        size="icon"
        as-child
      >
        <NuxtLink :to>
          <Download class="h-5 w-auto" />
        </NuxtLink>
      </Button>
      <Button v-else variant="ghost" size="icon" disabled>
        <Download class="h-5 w-auto" />
      </Button>
    </div>
  </div>
</template>
