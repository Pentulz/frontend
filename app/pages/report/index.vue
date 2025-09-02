<script setup lang="ts">
import ReportSummary from "~/components/report/ReportSummary.vue";
import DiscoveredHosts from "~/components/report/DiscoveredHosts.vue";
import MergedArtifacts from "~/components/report/MergedArtifacts.vue";
import VulnerabilitiesFound from "~/components/report/VulnerabilitiesFound.vue";

import { Button } from "#components";
import { FileDownIcon, FileCheck2Icon } from "lucide-vue-next";

definePageMeta({ breadcrumb: "Report", title: "Report" });
useHead({ title: "Report" });

// ----- MOCKS (frontend only) -----
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

const vulns = [
  {
    title: "SQL Injection",
    severity: "CRITICAL",
    cve: "CVE-2023-1234",
    host: "10.0.0.7",
    service: "HTTP",
    description: "Potential SQL injection vulnerability in user authentication",
  },
  {
    title: "Outdated SSH Version",
    severity: "HIGH",
    cve: "CVE-2023-5678",
    host: "10.0.0.7",
    service: "SSH",
    description: "SSH server running outdated version with known vulnerabilities",
  },
  {
    title: "Weak SSL Configuration",
    severity: "MEDIUM",
    cve: "CVE-2023-90",
    host: "10.0.0.7",
    service: "HTTPS",
    description: "SSL/TLS configuration allows weak cipher suites",
  },
];

// mock handler
const exportPdf = () => {
  // TODO: brancher un export réel
  console.log("Export PDF clicked");
};
</script>

<template>
  <div class="flex flex-col w-full gap-4 p-4">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold">{{ report.title }}</h1>
        <span class="text-muted-foreground">Report ID: {{ report.id }}</span>
      </div>

      <div class="flex items-center gap-2">
        <!-- Pilule noire 'Completed' -->
        <span class="inline-flex items-center gap-2 h-8 px-3 rounded-full bg-neutral-900 text-white text-xs">
          <FileCheck2Icon class="w-4 h-4" />
          Completed
        </span>

        <!-- Bouton Export PDF -->
        <Button variant="outline" class="gap-2 h-8" @click="exportPdf">
          <FileDownIcon class="w-4 h-4" />
          Export PDF
        </Button>
      </div>
    </div>

    <!-- Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
      <!-- Colonne gauche (2/3) -->
      <div class="flex flex-col gap-4 2xl:col-span-2">
        <ReportSummary
          :description="report.description"
          :jobs-merged="report.jobsMerged"
          :hosts-discovered="report.hostsDiscovered"
          :vulnerabilities="report.vulnerabilities"
          :generated-at="report.generatedAt"
        />

        <DiscoveredHosts :hosts="hosts" />

        <MergedArtifacts :artifacts="artifacts" />
      </div>

      <!-- Colonne droite (1/3) -->
      <div class="flex flex-col gap-4">
        <VulnerabilitiesFound :items="vulns" />
      </div>
    </div>
  </div>
</template>
