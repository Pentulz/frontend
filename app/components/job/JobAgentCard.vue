<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Separator,
} from "#components";
import { ServerIcon, ActivityIcon } from "lucide-vue-next";
import { interval, intervalToDuration } from "date-fns";

const { agentId } = defineProps<{
  agentId: string;
}>();

const {
  request: { pending, error },
  agent,
} = useAgent(agentId);

const darkChip =
  "inline-flex items-center gap-2 rounded-full bg-neutral-900 text-white px-3 py-1 text-xs";

const status = computed(() => {
  if (!agent.value?.last_seen_at) return "Offline";

  const duration = intervalToDuration(
    interval(agent.value.last_seen_at, new Date()),
  );

  if (!duration.minutes) return "Offline";

  return duration.minutes < 30 ? "Online" : "Offline";
});

const showSkeleton = useSkeleton(pending);
</script>

<template>
  <Skeleton v-if="showSkeleton || error || !agent" />
  <Card v-else>
    <!-- Titre -->
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <ServerIcon class="w-5 h-5" />
        <span>Agent</span>
      </CardTitle>
    </CardHeader>

    <CardContent class="flex flex-col gap-4">
      <!-- Nom + ID -->
      <div>
        <div class="text-base font-medium">{{ agent.name }}</div>
        <div class="text-sm text-muted-foreground">ID: {{ agent.id }}</div>
      </div>

      <Separator />

      <!-- Détails -->
      <div class="text-sm font-medium text-neutral-500">Details</div>

      <div class="flex flex-col gap-3">
        <div class="flex justify-between">
          <!-- Status -->
          <div class="text-sm text-neutral-500">Status:</div>
          <div class="text-right">
            <span :class="darkChip">
              <ActivityIcon class="w-3.5 h-3.5" />
              {{ status }}
            </span>
          </div>
        </div>

        <div class="flex justify-between">
          <!-- Type -->
          <div class="text-sm text-neutral-500">Type:</div>
          <div class="text-right">
            <span :class="darkChip">{{ agent.platform }}</span>
          </div>
        </div>

        <div v-if="agent.hostname" class="flex justify-between">
          <div class="text-sm text-neutral-500">Hostname:</div>
          <div class="text-right text-sm">{{ agent.hostname }}</div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
