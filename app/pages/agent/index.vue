<script setup lang="ts">
import { CreateAgent } from "~/components/forms";
import AgentDetails from "~/components/agent/AgentDetails.vue";

definePageMeta({
  breadcrumb: "Agents",
  title: "Agents",
});

useHead({ title: "Agents" });

// données mock pour la démo
const mock = {
  description: "Frontend only",
  type: "Container",
  os: "Ubuntu 24.04",
  ip: "10.0.0.8",
  uptime: "2d 4h 10m",
  lastSeen: new Date(),
  tags: ["production", "LTS"], 
};
</script>

<template>
  <div class="flex flex-col w-full gap-4 p-4">
    <!-- Header -->
    <div class="flex flex-col lg:flex-row w-full gap-4 lg:justify-between">
      <div class="flex flex-col gap-1">
        <h1 class="text-3xl font-bold text-foreground">Agents</h1>
        <span class="text-muted-foreground">Manage and monitor all the agents</span>
      </div>
      <CreateAgent />
    </div>

    <!-- Contenu : on affiche la carte Agent Details -->
    <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
      <div class="2xl:col-span-2">
        <AgentDetails
          :description="mock.description"
          :type="mock.type"
          :os="mock.os"
          :ip="mock.ip"
          :uptime="mock.uptime"
          :last-seen="mock.lastSeen"
          :tags="mock.tags" 
        />
      </div>

      <div class="flex flex-col gap-4">
        <div class="border rounded p-4 text-sm">Espace pour Quick Actions</div>
        <div class="border rounded p-4 text-sm">Espace pour Capabilities</div>
      </div>
    </div>
  </div>
</template>
