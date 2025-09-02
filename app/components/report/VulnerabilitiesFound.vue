<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from "#components";
import {
  LayoutGridIcon,
  XCircleIcon,
  AlertTriangleIcon,
  InfoIcon,
} from "lucide-vue-next";

type Severity = "CRITICAL" | "HIGH" | "MEDIUM";

export type Vulnerability = {
  title: string;
  severity: Severity;
  cve: string; // e.g. CVE-2023-1234
  host: string; // e.g. 10.0.0.7
  service: string; // e.g. HTTP
  description: string;
};

defineProps<{ items: Vulnerability[] }>();

const sevPill = (s: Severity) =>
  s === "CRITICAL"
    ? "bg-red-600 text-white"
    : s === "HIGH"
      ? "bg-orange-500 text-white"
      : "bg-neutral-200 text-neutral-700";

const sevIcon = (s: Severity) =>
  s === "CRITICAL" ? XCircleIcon : s === "HIGH" ? AlertTriangleIcon : InfoIcon;

const sevIconTint = (s: Severity) =>
  s === "CRITICAL"
    ? "text-rose-500"
    : s === "HIGH"
      ? "text-amber-500"
      : "text-yellow-500";
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
      <div v-for="(v, i) in items" :key="i" class="py-3 first:pt-0 last:pb-0">
        <!-- Title row -->
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-center gap-2">
            <component
              :is="sevIcon(v.severity)"
              class="w-4 h-4"
              :class="sevIconTint(v.severity)"
            />
            <div class="font-medium text-sm">{{ v.title }}</div>
          </div>
          <span
            class="text-[11px] rounded-full px-2 py-0.5"
            :class="sevPill(v.severity)"
          >
            {{ v.severity }}
          </span>
        </div>

        <!-- Meta -->
        <div class="mt-2 space-y-1 text-xs text-muted-foreground">
          <div>ID: {{ v.cve }}</div>
          <div>Host: {{ v.host }}</div>
          <div>Service: {{ v.service }}</div>
        </div>

        <!-- Description -->
        <p class="mt-2 text-xs text-neutral-700">
          {{ v.description }}
        </p>
      </div>
    </CardContent>
  </Card>
</template>
