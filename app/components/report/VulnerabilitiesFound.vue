<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from "#components";
import {
  LayoutGridIcon,
  XCircleIcon,
  AlertTriangleIcon,
  InfoIcon,
  AlertCircleIcon,
} from "lucide-vue-next";
import type { Component } from "vue";

import type { Finding } from "~/lib/api";

type Severity = Finding["severity"];

const { finding } = defineProps<{ finding: Finding[] }>();

const map: {
  [key in Severity]: { class: string; icon: Component; iconClass: string };
} = {
  info: {
    class: "bg-blue-500 text-white",
    icon: InfoIcon,
    iconClass: "text-blue-500",
  },
  low: {
    class: "bg-yellow-500 text-black",
    icon: InfoIcon,
    iconClass: "text-yellow-500",
  },
  medium: {
    class: "bg-amber-500 text-white",
    icon: AlertTriangleIcon,
    iconClass: "text-amber-500",
  },
  high: {
    class: "bg-orange-500 text-white",
    icon: AlertCircleIcon,
    iconClass: "text-orange-500",
  },
  critical: {
    class: "bg-red-500 text-white",
    icon: XCircleIcon,
    iconClass: "text-red-500",
  },
} as const;
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <LayoutGridIcon class="w-5 h-5" />
        <span>Vulnerabilities Found</span>
      </CardTitle>
    </CardHeader>

    <CardContent class="flex flex-col divide-y">
      <div v-for="(v, i) in finding" :key="i" class="py-3 first:pt-0 last:pb-0">
        <!-- Title row -->
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-center gap-2">
            <component
              :is="map[v.severity].icon"
              class="w-4 h-4"
              :class="map[v.severity].iconClass"
            />
            <div class="font-medium text-sm">{{ v.title }}</div>
          </div>
          <span
            class="text-[11px] rounded-full px-2 py-0.5"
            :class="map[v.severity].class"
          >
            {{ v.severity }}
          </span>
        </div>

        <!-- Meta -->
        <div class="mt-2 space-y-1 text-xs text-muted-foreground">
          <div>ID: {{ v.id }}</div>
          <div>Target: {{ v.target }}</div>
        </div>

        <!-- Description -->
        <p class="mt-2 text-xs text-neutral-700">
          {{ v.description }}
        </p>
      </div>
    </CardContent>
  </Card>
</template>
