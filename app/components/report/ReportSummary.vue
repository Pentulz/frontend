<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Separator,
} from "#components";
import { FileTextIcon } from "lucide-vue-next";
import type { Report } from "~/composables/use-api";

export type ReportSummary = Pick<
  Report,
  "description" | "created_at" | "results"
>;

const { report } = defineProps<{
  report: ReportSummary;
}>();

const vulnerabilitySeverities = ["low", "medium", "high", "critical"];
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
        <p class="text-sm font-medium text-muted-foreground">Description</p>
        <p class="text-base leading-6">
          {{ report.description || "—" }}
        </p>
      </div>

      <Separator />

      <!-- KPI row -->
      <div class="grid grid-cols-3">
        <div class="flex flex-col items-center">
          <div class="text-3xl md:text-4xl font-semibold leading-tight">
            {{ report.results.metadata.total_jobs }}
          </div>
          <div class="text-xs text-muted-foreground mt-1">Jobs Merged</div>
        </div>
        <div class="flex flex-col items-center">
          <div
            class="text-3xl md:text-4xl font-semibold leading-tight text-blue-500"
          >
            {{ report.results.metadata.total_findings }}
          </div>
          <div class="text-xs text-muted-foreground mt-1">Findings</div>
        </div>
        <div class="flex flex-col items-center">
          <div
            class="text-3xl md:text-4xl font-semibold leading-tight text-red-500"
          >
            {{
              report.results.all_findings.filter(({ severity }) =>
                vulnerabilitySeverities.includes(severity),
              ).length
            }}
          </div>
          <div class="text-xs text-muted-foreground mt-1">Vulnerabilities</div>
        </div>
      </div>

      <Separator />

      <!-- Generated -->
      <div class="grid grid-cols-2 items-center">
        <div class="text-sm text-neutral-500">Generated:</div>
        <div class="text-sm text-right">
          <NuxtTime
            v-if="report.created_at"
            :datetime="report.created_at"
            day="2-digit"
            month="2-digit"
            year="numeric"
            hour="2-digit"
            minute="2-digit"
            second="2-digit"
            locale="fr-FR"
          />
        </div>
      </div>
    </CardContent>
  </Card>
</template>
