<script setup lang="ts">
import type { Row } from "@tanstack/vue-table";
import type { Agent } from "~/composables/use-api";
import { Eye } from "lucide-vue-next";

type Props = {
  row: Row<Agent>;
};

const { row } = defineProps<Props>();

const to = computed(() => `/agents/${row.original.id}`);
</script>

<template>
  <div class="flex flex-row justify-end">
    <Button variant="ghost" size="icon" as-child>
      <NuxtLink :to="to">
        <Eye class="h-5 w-auto" />
      </NuxtLink>
    </Button>
  </div>
</template>
