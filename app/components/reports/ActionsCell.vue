<script setup lang="ts">
import type { Row } from "@tanstack/vue-table";
import type { Report } from ".";
import { Eye } from "lucide-vue-next";

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
    </div>
  </div>
</template>
