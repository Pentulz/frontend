<script setup lang="ts">
import {
  Card, CardHeader, CardTitle, CardContent,
  Separator, Badge,
} from "#components";
import { ServerIcon } from "lucide-vue-next";

export type Props = {
  description?: string;
  type: string;
  os: string;
  ip: string;
  uptime: string;
  lastSeen: Date | string;
  tags?: string[];
};

const props = defineProps<Props>();

// petit helper d'affichage
const lastSeenStr = computed(() => {
  if (props.lastSeen instanceof Date) return props.lastSeen.toLocaleString();
  if (typeof props.lastSeen === "string") {
    const d = new Date(props.lastSeen);
    return isNaN(+d) ? props.lastSeen : d.toLocaleString();
  }
  return "—";
});
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <ServerIcon class="w-5 h-5" />
        <span>Agent Details</span>
      </CardTitle>
    </CardHeader>

    <CardContent class="flex flex-col gap-4">
      <!-- Description -->
      <div class="flex flex-col gap-1">
        <p class="text-sm font-medium text-neutral-500">Description</p>
        <p class="text-base leading-6">{{ props.description || "—" }}</p>
      </div>

      <Separator />

      <!-- Deux colonnes -->
      <div class="grid grid-cols-1 2xl:grid-cols-2 gap-6">
        <!-- Colonne gauche -->
        <div class="flex flex-col gap-3">
          <p class="text-sm font-medium text-neutral-500">System Information</p>

          <div class="flex items-center justify-between">
            <span class="text-sm text-neutral-500">Type:</span>
            <Badge variant="outline">{{ props.type }}</Badge>
          </div>

          <div class="flex items-center justify-between">
            <span class="text-sm text-neutral-500">OS:</span>
            <span class="text-sm">{{ props.os }}</span>
          </div>
        </div>

        <!-- Colonne droite -->
        <div class="flex flex-col gap-3">
          <p class="text-sm font-medium text-neutral-500">Network &amp; Status</p>

          <div class="flex items-center justify-between">
            <span class="text-sm text-neutral-500">IP Address:</span>
            <span class="text-sm">{{ props.ip }}</span>
          </div>

          <div class="flex items-center justify-between">
            <span class="text-sm text-neutral-500">Uptime:</span>
            <span class="text-sm">{{ props.uptime }}</span>
          </div>

          <div class="flex items-center justify-between">
            <span class="text-sm text-neutral-500">Last Seen:</span>
            <span class="text-sm">{{ lastSeenStr }}</span>
          </div>
        </div>
      </div>

      <Separator />

      <!-- Tags -->
        <div class="flex items-center justify-between">
            <span class="text-sm text-neutral-500">Tags</span>
        </div>
        <div v-if="props.tags?.length" class="flex flex-wrap gap-2 pt-2">
            <Badge v-for="t in props.tags" :key="t" variant="secondary">{{ t }}</Badge>
        </div>
    </CardContent>
  </Card>
</template>
