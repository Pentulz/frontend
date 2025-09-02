<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent, Separator } from "#components";
import { FileTextIcon } from "lucide-vue-next";

type Dateish = string | Date;

const props = defineProps<{
  description?: string;
  jobsMerged: number;
  hostsDiscovered: number;
  vulnerabilities: number;
  generatedAt?: Dateish;
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
        <FileTextIcon class="w-5 h-5" />
        <span>Report Summary</span>
      </CardTitle>
    </CardHeader>

    <CardContent class="flex flex-col gap-6">
      <!-- Description -->
      <div class="flex flex-col gap-2">
        <p class="text-sm font-medium text-neutral-500">Description</p>
        <p class="text-base leading-6">
          {{ props.description || "—" }}
        </p>
      </div>

      <Separator />

      <!-- KPI row -->
      <div class="grid grid-cols-3">
        <div class="flex flex-col items-center">
          <div class="text-3xl md:text-4xl font-semibold leading-tight">{{ props.jobsMerged }}</div>
          <div class="text-xs text-muted-foreground mt-1">Jobs Merged</div>
        </div>
        <div class="flex flex-col items-center">
          <div class="text-3xl md:text-4xl font-semibold leading-tight text-blue-500">
            {{ props.hostsDiscovered }}
          </div>
          <div class="text-xs text-muted-foreground mt-1">Hosts Discovered</div>
        </div>
        <div class="flex flex-col items-center">
          <div class="text-3xl md:text-4xl font-semibold leading-tight text-red-500">
            {{ props.vulnerabilities }}
          </div>
          <div class="text-xs text-muted-foreground mt-1">Vulnerabilities</div>
        </div>
      </div>

      <Separator />

      <!-- Generated -->
      <div class="grid grid-cols-2 items-center">
        <div class="text-sm text-neutral-500">Generated:</div>
        <div class="text-sm text-right">{{ fmt(props.generatedAt) }}</div>
      </div>
    </CardContent>
  </Card>
</template>
