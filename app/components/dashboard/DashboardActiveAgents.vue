<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Button,
} from "#components";

export type Agent = {
  name: string;
  status: 'busy' | 'idle' | 'offline';
  type: string;
  ip: string;
  os: string;
  tools: number;
};

export type Props = {
  agents?: Agent[];
};

const props = withDefaults(defineProps<Props>(), {
  agents: () => []
});

// Fonction pour obtenir la variante et le texte du badge selon le statut
const getStatusInfo = (status: string) => {
  switch (status) {
    case 'busy':
      return { variant: 'default', text: 'busy', bgColor: 'bg-green-100 text-green-800' };
    case 'idle':
      return { variant: 'secondary', text: 'idle', bgColor: 'bg-blue-100 text-blue-800' };
    case 'offline':
      return { variant: 'destructive', text: 'offline', bgColor: 'bg-red-100 text-red-800' };
    default:
      return { variant: 'outline', text: status, bgColor: 'bg-gray-100 text-gray-800' };
  }
};
</script>

<template>
  <Card>
    <CardHeader>
      <div class="flex items-center justify-between">
        <CardTitle class="text-base font-semibold">Active Agents</CardTitle>
        <Button variant="ghost" size="sm" class="text-sm text-muted-foreground hover:text-foreground">
          View All →
        </Button>
      </div>
    </CardHeader>
    
    <CardContent>
      <div class="space-y-4">
        <div 
          v-for="agent in props.agents" 
          :key="`${agent.name}-${agent.ip}`"
          class="flex items-center justify-between py-3 border-b border-border last:border-b-0"
        >
          <div class="flex-1">
            <div class="flex items-center gap-3">
              <div class="flex-1">
                <div class="flex items-center gap-2">
                  <div class="font-medium text-sm">{{ agent.name }}</div>
                  <Badge 
                    :class="getStatusInfo(agent.status).bgColor"
                    class="text-xs px-2 py-1 rounded"
                  >
                    {{ getStatusInfo(agent.status).text }}
                  </Badge>
                </div>
                <div class="text-xs text-muted-foreground mt-1">
                  {{ agent.type }}
                </div>
                <div class="text-xs text-muted-foreground mt-1">
                  {{ agent.ip }} {{ agent.os }}
                </div>
              </div>
              
              <div class="text-right text-xs text-muted-foreground">
                <div>{{ agent.tools }} tool{{ agent.tools !== 1 ? 's' : '' }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>