<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Button,
} from "#components";
import { ArrowRightIcon } from "lucide-vue-next";

import type { Report } from "~/composables/use-api";

export type RecentReport = Pick<Report, "name" | "id"> & {
  vulnerabilities: number;
  severity: "critical" | "high" | "medium" | "low" | "info";
  created: string;
};

export type Props = {
  reports?: RecentReport[];
};

const { reports = [] } = defineProps<Props>();

// Fonction pour obtenir la couleur du badge de sévérité
const getSeverityInfo = (severity: string) => {
  switch (severity) {
    case "high":
      return { bgColor: "bg-red-100 text-red-800" };
    case "medium":
      return { bgColor: "bg-yellow-100 text-yellow-800" };
    case "low":
      return { bgColor: "bg-green-100 text-green-800" };
    default:
      return { bgColor: "bg-gray-100 text-gray-800" };
  }
};
</script>

<template>
  <Card>
    <CardHeader>
      <div class="flex items-center justify-between">
        <CardTitle class="text-base font-semibold">Recent Reports</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          class="text-sm text-muted-foreground hover:text-foreground"
          as-child
        >
          <NuxtLink to="/reports">
            View All <ArrowRightIcon class="size-4" />
          </NuxtLink>
        </Button>
      </div>
    </CardHeader>

    <CardContent>
      <!-- Layout en colonnes comme dans l'image -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <NuxtLink
          v-for="report in reports"
          :key="report.id"
          :to="`/reports/${report.id}`"
          class="p-4 border border-border rounded-lg space-y-3"
        >
          <!-- Titre avec badge statut -->
          <div>
            <div class="font-medium text-sm mb-2">{{ report.name }}</div>
          </div>

          <!-- Vulnerabilities avec badge sévérité -->
          <div class="flex justify-between items-center">
            <span class="text-sm text-muted-foreground">Vulnerabilities:</span>
            <div class="flex items-center gap-1">
              <span class="text-sm font-medium">{{
                report.vulnerabilities
              }}</span>
              <Badge
                :class="getSeverityInfo(report.severity).bgColor"
                class="text-xs px-1 py-0.5 rounded"
              >
                {{ report.severity }}
              </Badge>
            </div>
          </div>

          <!-- Created date -->
          <div
            class="text-xs text-muted-foreground pt-2 border-t border-border"
          >
            Created {{ report.created }}
          </div>
        </NuxtLink>
      </div>
    </CardContent>
  </Card>
</template>
