<script setup lang="ts">
import ReportSummary from "~/components/report/ReportSummary.vue";

definePageMeta({
  breadcrumb: "Report",
  title: "Report",
});
useHead({ title: "Report" });

// Mock data (frontend only)
const report = {
  id: "report-1234",
  title: "Network Security Assessment",
  description:
    "Comprehensive security assessment of network infrastructure including vulnerability scanning and host discovery",
  jobsMerged: 5,
  hostsDiscovered: 2,
  vulnerabilities: 3,
  generatedAt: "2025-08-22 13:45:00",
};
</script>

<template>
  <div class="flex flex-col w-full gap-4 p-4">
    <!-- (Optionnel) En-tête simple -->
    <div class="flex flex-col gap-1">
      <h1 class="text-3xl font-bold">{{ report.title }}</h1>
      <span class="text-muted-foreground">Report ID: {{ report.id }}</span>
    </div>

    <!-- Report Summary uniquement -->
    <ReportSummary
      :description="report.description"
      :jobs-merged="report.jobsMerged"
      :hosts-discovered="report.hostsDiscovered"
      :vulnerabilities="report.vulnerabilities"
      :generated-at="report.generatedAt"
    />
  </div>
</template>
