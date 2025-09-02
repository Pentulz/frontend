<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent, Badge } from "#components";
import { ClockIcon, CheckCircle2Icon, ExternalLinkIcon } from "lucide-vue-next";

export type Job = {
  id: string;
  name: string;
  subtitle?: string; // ex: job-123
  status: "completed" | "running" | "failed" | "queued";
  duration: string;
  startedAt: string;
  href?: string;
};

defineProps<{ jobs: Job[] }>();
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <ClockIcon class="w-5 h-5" />
        <span>Recent Jobs</span>
      </CardTitle>
    </CardHeader>

    <CardContent class="p-0">
      <table class="w-full text-sm">
        <!-- Header -->
        <thead>
          <tr class="text-xs text-muted-foreground text-left">
            <th class="px-4 py-2 font-medium">Job Name</th>
            <th class="px-4 py-2 font-medium text-center">Status</th>
            <th class="px-4 py-2 font-medium text-right">Duration</th>
            <th class="px-4 py-2 font-medium text-right">Started</th>
            <th class="px-4 py-2 font-medium text-right">Actions</th>
          </tr>
        </thead>

        <!-- Body -->
        <tbody class="divide-y">
          <tr v-for="j in jobs" :key="j.id" class="hover:bg-muted/30">
            <!-- Job name -->
            <td class="px-4 py-3">
              <div class="font-medium">{{ j.name }}</div>
              <div class="text-xs text-muted-foreground">
                {{ j.subtitle || `job-${j.id}` }}
              </div>
            </td>

            <!-- Status -->
            <td class="px-4 py-3 text-center">
              <Badge
                variant="outline"
                class="h-6 px-2 text-xs rounded-full inline-flex items-center gap-1"
              >
                <CheckCircle2Icon class="w-3 h-3" />
                <span class="capitalize">{{ j.status }}</span>
              </Badge>
            </td>

            <!-- Duration -->
            <td class="px-4 py-3 text-right">{{ j.duration }}</td>

            <!-- Started -->
            <td class="px-4 py-3 text-right">{{ j.startedAt }}</td>

            <!-- Actions -->
            <td class="px-4 py-3 text-right">
              <a
                :href="j.href || '#'"
                class="inline-flex items-center justify-center w-7 h-7 border rounded-md"
                aria-label="Open job"
              >
                <ExternalLinkIcon class="w-4 h-4" />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </CardContent>
  </Card>
</template>
