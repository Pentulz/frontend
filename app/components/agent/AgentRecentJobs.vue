<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent, Badge } from "#components";
import { ClockIcon, CheckCircle2Icon, ExternalLinkIcon } from "lucide-vue-next";
import type { Job } from "~/composables/use-api";
import { formatDistance, formatDistanceToNow } from "date-fns";

const { jobs } = defineProps<{ jobs: Job[] }>();

const duration = ({ started_at, completed_at }: Job) => {
  if (!started_at) return undefined;

  return completed_at
    ? formatDistance(completed_at, started_at)
    : formatDistanceToNow(started_at);
};
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <ClockIcon class="w-5 h-5" />
        <span>Recent Jobs</span>
      </CardTitle>
    </CardHeader>

    <CardContent class="mx-2 overflow-scroll">
      <table class="w-full text-sm">
        <!-- Header -->
        <thead>
          <tr class="text-xs text-muted-foreground text-left">
            <th class="px-4 py-2 font-medium">Job Name</th>
            <th class="px-4 py-2 font-medium">Status</th>
            <th class="px-4 py-2 font-medium text-right">Duration</th>
            <th class="px-4 py-2 font-medium text-right">Started</th>
            <th class="px-4 py-2 font-medium text-right">Actions</th>
          </tr>
        </thead>

        <!-- Body -->
        <tbody class="divide-y">
          <tr v-for="job in jobs" :key="job.id" class="hover:bg-muted/30">
            <!-- Job name -->
            <td class="px-4 py-3">
              <div class="font-medium">{{ job.name }}</div>
              <div class="text-xs text-muted-foreground">
                {{ job.id }}
              </div>
            </td>

            <!-- Status -->
            <td class="px-4 py-3">
              <Badge
                variant="outline"
                class="h-6 px-2 text-xs rounded-full inline-flex items-center gap-1"
              >
                <CheckCircle2Icon class="w-3 h-3" />
                <span class="capitalize">{{ job.status }}</span>
              </Badge>
            </td>

            <!-- Duration -->
            <td class="px-4 py-3 text-right">{{ duration(job) }}</td>

            <!-- Started -->
            <td class="px-4 py-3 text-right">
              <NuxtTime
                v-if="job.started_at"
                :datetime="job.started_at"
                day="2-digit"
                month="2-digit"
                year="numeric"
                hour="2-digit"
                minute="2-digit"
                second="2-digit"
                locale="fr-FR"
              />
              <template v-else> - </template>
            </td>

            <!-- Actions -->
            <td class="px-4 py-3 text-right">
              <Button size="icon" variant="outline" as-child>
                <NuxtLink :to="`/jobs/${job.id}`">
                  <ExternalLinkIcon class="size-4" />
                </NuxtLink>
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </CardContent>
  </Card>
</template>
