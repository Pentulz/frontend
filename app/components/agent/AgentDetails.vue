<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Separator,
} from "#components";
import { ServerIcon } from "lucide-vue-next";
import { formatDistanceToNow } from "date-fns";

import type { Agent } from "~/composables/use-api";

export type AgentDetails = Pick<
  Agent,
  "description" | "platform" | "last_seen_at" | "created_at" | "hostname"
>;

export type Props = {
  agent: AgentDetails;
};

const { agent } = defineProps<Props>();

const lastSeenStr = computed(() =>
  agent.last_seen_at ? formatDistanceToNow(agent.last_seen_at) : undefined,
);
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <ServerIcon class="w-5 h-5" />
        <span>Agent Details</span>
      </CardTitle>
    </CardHeader>

    <CardContent class="flex flex-col gap-4">
      <!-- Description -->
      <div class="flex flex-col gap-1">
        <p class="text-sm font-medium text-muted-foreground">Description</p>
        <p class="text-base leading-6">{{ agent.description || "—" }}</p>
      </div>

      <Separator />

      <!-- Deux colonnes -->
      <div class="grid grid-cols-1 2xl:grid-cols-2 gap-6">
        <!-- Colonne gauche -->
        <div class="flex flex-col gap-3">
          <p class="text-sm font-medium text-muted-foreground">
            System Information
          </p>

          <div v-if="agent.platform" class="flex items-center justify-between">
            <span class="text-sm text-muted-foreground">Platform:</span>
            <span class="text-sm">{{ agent.platform }}</span>
          </div>
        </div>

        <!-- Colonne droite -->
        <div class="flex flex-col gap-3">
          <p class="text-sm font-medium text-muted-foreground">
            Network &amp; Status
          </p>

          <div v-if="agent.hostname" class="flex items-center justify-between">
            <span class="text-sm text-muted-foreground">Hostname:</span>
            <span class="text-sm">{{ agent.hostname }}</span>
          </div>

          <div class="flex items-center justify-between">
            <span class="text-sm text-muted-foreground">Last Seen:</span>
            <span v-if="lastSeenStr" class="text-sm">{{ lastSeenStr }}</span>
            <span v-else class="text-sm">never</span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
