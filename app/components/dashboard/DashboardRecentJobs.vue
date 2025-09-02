<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Button,
} from "#components";
import { ArrowRightIcon } from "lucide-vue-next";
import { formatDistance } from "date-fns/formatDistance";

import type { Job } from "~/composables/use-api";

export type RecentJob = Pick<
  Job,
  "id" | "name" | "status" | "completed_at" | "started_at" | "created_at"
> & {
  agent: string;
};

export type Props = {
  jobs?: RecentJob[];
};

const { jobs = [] } = defineProps<Props>();
// Fonction pour obtenir la variante et le texte du badge selon le statut
const getStatusInfo = (status: Job["status"]) => {
  switch (status) {
    case "Completed":
      return {
        variant: "default",
        text: "completed",
        bgColor: "bg-green-100 text-green-800",
      };
    case "Running":
      return {
        variant: "secondary",
        text: "running",
        bgColor: "bg-blue-100 text-blue-800",
      };
    default:
      return {
        variant: "outline",
        text: status,
        bgColor: "bg-gray-100 text-gray-800",
      };
  }
};

const getStatusTime = ({
  status,
  created_at,
  started_at,
  completed_at,
}: RecentJob) => {
  if (status === "Completed") return completed_at;

  if (status === "Running") return started_at;

  return created_at;
};
</script>

<template>
  <Card>
    <CardHeader>
      <div class="flex items-center justify-between">
        <CardTitle class="text-base font-semibold">Recent Jobs</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          class="text-sm text-muted-foreground hover:text-foreground"
          as-child
        >
          <NuxtLink to="/jobs">
            View All <ArrowRightIcon class="size-4" />
          </NuxtLink>
        </Button>
      </div>
    </CardHeader>

    <CardContent>
      <div class="space-y-4">
        <div
          v-for="job in jobs"
          :key="job.id"
          class="flex items-center justify-between py-3 border-b border-border last:border-b-0"
        >
          <div class="flex-1">
            <div class="flex items-center gap-3">
              <div class="flex-1">
                <div class="font-medium text-sm">{{ job.name }}</div>
                <div class="text-xs text-muted-foreground mt-1">
                  Agent: {{ job.agent }}
                </div>
                <div
                  v-if="job.started_at"
                  class="text-xs text-muted-foreground mt-1"
                >
                  Duration:
                  {{
                    formatDistance(
                      job.completed_at ?? new Date(),
                      job.started_at,
                      { addSuffix: false },
                    )
                  }}
                </div>
              </div>

              <div class="flex items-start gap-3">
                <Badge
                  :class="getStatusInfo(job.status).bgColor"
                  class="text-xs px-2 py-1 rounded"
                >
                  {{ getStatusInfo(job.status).text }}
                </Badge>

                <div class="text-right text-xs text-muted-foreground">
                  <DateTimeCell :datetime="getStatusTime(job)" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
