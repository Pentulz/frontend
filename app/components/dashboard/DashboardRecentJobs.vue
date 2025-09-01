<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Button,
} from "#components";

export type Job = {
  name: string;
  agent: string;
  status: 'completed' | 'running' | 'failed';
  duration: string;
  timestamp: string;
};

export type Props = {
  jobs?: Job[];
};

const props = withDefaults(defineProps<Props>(), {
  jobs: () => []
});

// Function to get badge variant and text based on status
const getStatusInfo = (status: string) => {
  switch (status) {
    case 'completed':
      return { text: 'completed', bgColor: 'bg-green-100 text-green-800' };
    case 'running':
      return { text: 'running', bgColor: 'bg-blue-100 text-blue-800' };
    case 'failed':
      return { text: 'failed', bgColor: 'bg-red-100 text-red-800' };
    default:
      return { text: status, bgColor: 'bg-gray-100 text-gray-800' };
  }
};

// Function to get timestamp prefix
const getTimestampPrefix = (status: string) => {
  switch (status) {
    case 'completed':
      return 'Completed:';
    case 'running':
      return 'Started:';
    case 'failed':
      return 'Failed:';
    default:
      return 'Updated:';
  }
};
</script>

<template>
  <Card>
    <CardHeader>
      <div class="flex items-center justify-between">
        <CardTitle class="text-base font-semibold">Recent Jobs</CardTitle>
        <Button variant="ghost" size="sm" class="text-sm text-muted-foreground hover:text-foreground">
          View All →
        </Button>
      </div>
    </CardHeader>
    
    <CardContent>
      <div class="space-y-4">
        <div 
          v-for="job in props.jobs" 
          :key="`${job.name}-${job.agent}`"
          class="flex items-center justify-between py-3 border-b border-border last:border-b-0"
        >
          <div class="flex-1">
            <div class="flex items-center gap-3">
              <div class="flex-1">
                <div class="font-medium text-sm">{{ job.name }}</div>
                <div class="text-xs text-muted-foreground mt-1">
                  Agent: {{ job.agent }}
                </div>
                <div class="text-xs text-muted-foreground mt-1">
                  Duration: {{ job.duration }}
                </div>
              </div>
              
              <div class="flex items-center gap-3">
                <Badge 
                  :class="getStatusInfo(job.status).bgColor"
                  class="text-xs px-2 py-1 rounded"
                >
                  {{ getStatusInfo(job.status).text }}
                </Badge>
                
                <div class="text-right text-xs text-muted-foreground">
                  <div>{{ getTimestampPrefix(job.status) }} {{ job.timestamp }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>