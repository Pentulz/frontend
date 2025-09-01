<script setup>
definePageMeta({
  breadcrumb: "Dashboard",
  title: "Dashboard",
});

useHead({
  title: "Dashboard",
});

// Données des statistiques
const dashboardStats = [
  {
    title: 'Total Jobs',
    value: 1234
  },
  {
    title: 'Active Agents',
    value: 12
  },
  {
    title: 'Reports Generated',
    value: 567
  },
  {
    title: 'Running Jobs',
    value: 5
  }
];

// Données des jobs récents
const recentJobs = [
  {
    name: 'Network Security Scan',
    agent: 'agent-007',
    status: 'completed',
    duration: '45m',
    timestamp: '11:45:00'
  },
  {
    name: 'Vulnerability Assessment',
    agent: 'agent-007',
    status: 'running',
    duration: '12m',
    timestamp: '11:45:00'
  },
  {
    name: 'Port Discovery',
    agent: 'agent-007',
    status: 'failed',
    duration: '2m',
    timestamp: '11:45:00'
  }
];

// Données des agents actifs
const activeAgents = [
  {
    name: 'James Bond',
    status: 'busy',
    type: 'Container',
    ip: '10.0.0.7',
    os: 'Kali 24',
    tools: 3
  },
  {
    name: 'Workstation XYZ',
    status: 'idle',
    type: 'Workstation',
    ip: '192.168.1.32',
    os: 'Ubuntu 24.04',
    tools: 2
  },
  {
    name: 'Johnny English',
    status: 'offline',
    type: 'Workstation',
    ip: '169.254.254.254',
    os: 'Windows Server',
    tools: 1
  }
];

// Données des rapports récents
const recentReports = [
  {
    name: 'Q1 Security Assessment',
    status: 'completed',
    hostsFound: 45,
    vulnerabilities: 12,
    severity: 'high',
    created: '2025-08-23'
  },
  {
    name: 'Network Infrastructure Audit',
    status: 'processing',
    hostsFound: 23,
    vulnerabilities: 5,
    severity: 'medium',
    created: '2025-08-23'
  },
  {
    name: 'Web Application Scan',
    status: 'completed',
    hostsFound: 8,
    vulnerabilities: 3,
    severity: 'low',
    created: '2025-08-23'
  }
];
</script>

<template>
  <div class="container mx-auto p-6">
    <div class="mb-6">
      <h1 class="text-3xl font-bold">Dashboard</h1>
      <p class="text-muted-foreground">Overview of jobs, runners, and reports</p>
    </div>

    <div>
      <DashboardStats :stats="dashboardStats" />
    </div>
    
    <!-- Recent Jobs et Active Agents côte à côte -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <DashboardRecentJobs :jobs="recentJobs" />
      <DashboardActiveAgents :agents="activeAgents" />
    </div>

    <!-- Recent Reports en dessous -->
    <DashboardRecentReports :reports="recentReports" />
  </div>
</template>