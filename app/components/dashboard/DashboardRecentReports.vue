<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Button,
} from "#components";

export type Report = {
  name: string;
  status: 'completed' | 'processing' | 'failed';
  hostsFound: number;
  vulnerabilities: number;
  severity: 'high' | 'medium' | 'low';
  created: string;
};

export type Props = {
  reports?: Report[];
};

const props = withDefaults(defineProps<Props>(), {
  reports: () => []
});

// Fonction pour obtenir la variante et le texte du badge selon le statut
const getStatusInfo = (status: string) => {
  switch (status) {
    case 'completed':
      return { variant: 'default', text: 'completed', bgColor: 'bg-green-100 text-green-800' };
    case 'processing':
      return { variant: 'secondary', text: 'processing', bgColor: 'bg-blue-100 text-blue-800' };
    case 'failed':
      return { variant: 'destructive', text: 'failed', bgColor: 'bg-red-100 text-red-800' };
    default:
      return { variant: 'outline', text: status, bgColor: 'bg-gray-100 text-gray-800' };
  }
};

// Fonction pour obtenir la couleur du badge de sévérité
const getSeverityInfo = (severity: string) => {
  switch (severity) {
    case 'high':
      return { bgColor: 'bg-red-100 text-red-800' };
    case 'medium':
      return { bgColor: 'bg-yellow-100 text-yellow-800' };
    case 'low':
      return { bgColor: 'bg-green-100 text-green-800' };
    default:
      return { bgColor: 'bg-gray-100 text-gray-800' };
  }
};
</script>

<template>
  <Card>
    <CardHeader>
      <div class="flex items-center justify-between">
        <CardTitle class="text-base font-semibold">Recent Reports</CardTitle>
        <Button variant="ghost" size="sm" class="text-sm text-muted-foreground hover:text-foreground">
          View All →
        </Button>
      </div>
    </CardHeader>
    
    <CardContent>
      <!-- Layout en colonnes comme dans l'image -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div 
          v-for="report in props.reports" 
          :key="`${report.name}-${report.created}`"
          class="p-4 border border-border rounded-lg space-y-3"
        >
          <!-- Titre avec badge statut -->
          <div>
            <div class="font-medium text-sm mb-2">{{ report.name }}</div>
            <Badge 
              :class="getStatusInfo(report.status).bgColor"
              class="text-xs px-2 py-1 rounded"
            >
              {{ getStatusInfo(report.status).text }}
            </Badge>
          </div>

          <!-- Hosts Found -->
          <div class="flex justify-between items-center">
            <span class="text-sm text-muted-foreground">Hosts Found:</span>
            <span class="text-sm font-medium">{{ report.hostsFound }}</span>
          </div>

          <!-- Vulnerabilities avec badge sévérité -->
          <div class="flex justify-between items-center">
            <span class="text-sm text-muted-foreground">Vulnerabilities:</span>
            <div class="flex items-center gap-1">
              <span class="text-sm font-medium">{{ report.vulnerabilities }}</span>
              <Badge 
                :class="getSeverityInfo(report.severity).bgColor"
                class="text-xs px-1 py-0.5 rounded"
              >
                {{ report.severity }}
              </Badge>
            </div>
          </div>

          <!-- Created date -->
          <div class="text-xs text-muted-foreground pt-2 border-t border-border">
            Created {{ report.created }}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>