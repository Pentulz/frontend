<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent, Separator } from "#components";
import { ServerIcon, ActivityIcon } from "lucide-vue-next";

defineProps<{
  name: string;
  id: string;
  status: "Online" | "Offline";
  type: string;   // ex: "Container"
  ip: string;     // ex: "10.0.0.7"
}>();

const darkChip = "inline-flex items-center gap-2 rounded-full bg-neutral-900 text-white px-3 py-1 text-xs";
</script>

<template>
  <Card>
    <!-- Titre -->
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <ServerIcon class="w-5 h-5" />
        <span>Agent</span>
      </CardTitle>
    </CardHeader>

    <CardContent class="flex flex-col gap-4">
      <!-- Nom + ID -->
      <div>
        <div class="text-base font-medium">{{ name }}</div>
        <div class="text-sm text-muted-foreground">ID: {{ id }}</div>
      </div>

      <Separator />

      <!-- Détails -->
      <div class="text-sm font-medium text-neutral-500">Details</div>

      <div class="grid grid-cols-2 gap-y-3">
        <!-- Status -->
        <div class="text-sm text-neutral-500">Status:</div>
        <div class="text-right">
          <span :class="darkChip">
            <ActivityIcon class="w-3.5 h-3.5" />
            {{ status }}
          </span>
        </div>

        <!-- Type -->
        <div class="text-sm text-neutral-500">Type:</div>
        <div class="text-right">
          <span :class="darkChip">{{ type }}</span>
        </div>

        <!-- IP -->
        <div class="text-sm text-neutral-500">IP:</div>
        <div class="text-right text-sm">{{ ip }}</div>
      </div>
    </CardContent>
  </Card>
</template>
