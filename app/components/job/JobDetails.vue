<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Separator,
} from "#components";
import { CogIcon } from "lucide-vue-next";
import { interval, intervalToDuration, formatDuration } from "date-fns";

import type { Job } from "~/composables/use-api";

type JobDetails = Pick<
  Job,
  | "description"
  | "started_at"
  | "completed_at"
  | "created_at"
  | "action"
  | "results"
>;

const { job } = defineProps<{
  job: JobDetails;
}>();
</script>

<template>
  <Card>
    <!-- Header -->
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <CogIcon class="w-5 h-5" />
        <span>Job Details</span>
      </CardTitle>
    </CardHeader>

    <CardContent class="flex flex-col gap-6">
      <!-- Description -->
      <div class="flex flex-col gap-2">
        <p class="text-sm font-medium text-muted-foreground">Description</p>
        <p class="text-xl leading-7">{{ job.description }}</p>
      </div>

      <Separator />

      <!-- Execution Info (labels à gauche, valeurs à droite) -->
      <div class="flex flex-col gap-3">
        <p class="text-sm font-medium text-muted-foreground">Execution Info</p>

        <div class="flex flex-col gap-3">
          <div class="flex flex-row justify-between">
            <div class="text-sm text-muted-foreground">Duration:</div>
            <div class="text-sm text-right">
              <template v-if="job.started_at && job.completed_at">
                {{
                  formatDuration(
                    intervalToDuration(
                      interval(job.started_at, job.completed_at),
                    ),
                  )
                }}
              </template>
              <template v-else>-</template>
            </div>
          </div>

          <div class="flex flex-row justify-between">
            <div class="text-sm text-muted-foreground">Started:</div>
            <div class="text-sm text-right">
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
              /><template v-else>-</template>
            </div>
          </div>

          <div class="flex flex-row justify-between">
            <div class="text-sm text-muted-foreground">Completed:</div>
            <div class="text-sm text-right">
              <NuxtTime
                v-if="job.completed_at"
                :datetime="job.completed_at"
                day="2-digit"
                month="2-digit"
                year="numeric"
                hour="2-digit"
                minute="2-digit"
                second="2-digit"
                locale="fr-FR"
              /><template v-else>-</template>
            </div>
          </div>

          <div class="flex flex-row justify-between">
            <div class="text-sm text-muted-foreground">Instructions:</div>
            <div class="text-sm text-right font-mono break-after-auto">
              {{ `${job.action.cmd} ${job.action.args.join(" ")}` }}
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
