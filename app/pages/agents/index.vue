<script setup lang="ts">
import { agents } from "./data";
import { CreateAgent } from "~/components/forms";

definePageMeta({
  breadcrumb: "Agents",
  title: "Agents",
});

useHead({
  title: "Agents",
});
</script>

<template>
  <div class="flex flex-col w-full gap-4 p-4">
    <div class="flex flex-col lg:flex-row w-full gap-4 lg:justify-between">
      <div class="flex flex-col gap-1">
        <h1 class="text-3xl font-bold text-foreground">Agents</h1>
        <span class="text-muted-foreground"
          >Manage and monitor all the agents</span
        >
      </div>
      <CreateAgent />
    </div>

    <!-- Table space -->
    <AgentsTable :agents="agents" />
  </div>
</template>
