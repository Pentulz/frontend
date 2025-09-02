<script setup lang="ts">
import ReportSummary from "~/components/report/ReportSummary.vue";
import DiscoveredHosts from "~/components/report/DiscoveredHosts.vue";
import MergedArtifacts from "~/components/report/MergedArtifacts.vue";

definePageMeta({
  breadcrumb: "Report",
  title: "Report",
});
useHead({ title: "Report" });

// --- Mocks (frontend only) ---
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

const hosts = [
  {
    ip: "169 .256 .254 .265",
    hostname: "gateway.local",
    os: "Windows Server",
    openPorts: 5,
    services: ["SMB", "HTTPS", "SSH"],
  },
  {
    ip: "10 .0 .0 .7",
    hostname: "bond.mi6.uk.gov",
    os: "Kali Linux",
    openPorts: 2,
    services: ["SSH", "HTTP"],
  },
];

const artifacts = [
  { name: "nmap_scan.xml", type: "XML", size: "856 KB", sourceJob: "job-007", href: "#" },
  { name: "traffic_analysis.pcap", type: "PCAP", size: "45.2 MB", sourceJob: "job-077", href: "#" },
  { name: "something_really_long_to_truncat_just_in_….txt", type: "TXT", size: "4 KB", sourceJob: "job-420", href: "#" },
];
</script>

<template>
  <div class="flex flex-col w-full gap-4 p-4">
    <!-- Header -->
    <div class="flex flex-col gap-1">
      <h1 class="text-3xl font-bold">{{ report.title }}</h1>
      <span class="text-muted-foreground">Report ID: {{ report.id }}</span>
    </div>

    <!-- Report Summary -->
    <ReportSummary
      :description="report.description"
      :jobs-merged="report.jobsMerged"
      :hosts-discovered="report.hostsDiscovered"
      :vulnerabilities="report.vulnerabilities"
      :generated-at="report.generatedAt"
    />

    <!-- Discovered Hosts -->
    <DiscoveredHosts :hosts="hosts" />

    <!-- Merged Artifacts -->
    <MergedArtifacts :artifacts="artifacts" />
  </div>
</template>
