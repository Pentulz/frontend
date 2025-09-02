<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent, Separator } from "#components";
import { CogIcon } from "lucide-vue-next";

type Dateish = string | Date;

const props = defineProps<{
  description?: string;
  duration?: string;   // ex: "1h 15m"
  started?: Dateish;   // "2025-08-22 13:45:00"
  completed?: Dateish; // "2025-08-22 15:00:00"
  toolLabel?: string;  // ex: "nmap:"
  command?: string;    // ex: "-sS -sV --top-ports 1000 --open 192.168.1.0/24"
}>();

const fmt = (d?: Dateish) => {
  if (!d) return "—";
  const dd = typeof d === "string" ? new Date(d) : d;
  return isNaN(+dd) ? String(d) : dd.toLocaleString();
};
</script>

<template>
  <Card>
    <!-- Header -->
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <CogIcon class="w-5 h-5" />
        <span>Job Details</span>
      </CardTitle>
    </CardHeader>

    <CardContent class="flex flex-col gap-6">
      <!-- Description -->
      <div class="flex flex-col gap-2">
        <p class="text-sm font-medium text-neutral-500">Description</p>
        <p class="text-xl leading-7">{{ props.description || "—" }}</p>
      </div>

      <Separator />

      <!-- Execution Info (labels à gauche, valeurs à droite) -->
      <div class="flex flex-col gap-3">
        <p class="text-sm font-medium text-neutral-500">Execution Info</p>

        <div class="grid grid-cols-2 gap-y-3">
          <div class="text-sm text-neutral-500">Duration:</div>
          <div class="text-sm text-right">{{ props.duration || "—" }}</div>

          <div class="text-sm text-neutral-500">Started:</div>
          <div class="text-sm text-right">{{ fmt(props.started) }}</div>

          <div class="text-sm text-neutral-500">Completed:</div>
          <div class="text-sm text-right">{{ fmt(props.completed) }}</div>
        </div>
      </div>

      <Separator />

      <!-- Instructions -->
      <div class="flex flex-col gap-3">
        <p class="text-sm font-medium text-neutral-500">Instructions</p>

        <div class="grid grid-cols-2 items-start">
          <div class="text-sm text-neutral-500">{{ props.toolLabel || "nmap:" }}</div>
          <div class="text-right">
            <span class="font-mono text-base">
              {{ props.command || "—" }}
            </span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
