<script setup lang="ts">
import {
  CircleCheckBig,
  CircleQuestionMark,
  CircleX,
  Loader,
  CircleDashed,
} from "lucide-vue-next";
import { Badge } from "~/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { DateTimeCell } from "~/components/ui/data-table";
import type { Component } from "vue";
import type { BadgeVariants } from "~/components/ui/badge";
import type { Job } from ".";

type Props = Pick<Job, "started_at" | "completed_at" | "status">;

const {
  started_at = undefined,
  completed_at = undefined,
  status,
} = defineProps<Props>();

const icons: { [key: string]: Component } = {
  Completed: CircleCheckBig,
  Failed: CircleX,
  Pending: CircleDashed,
  Running: Loader,
};

const variants: { [key: string]: BadgeVariants["variant"] } = {
  Completed: "outline",
  Failed: "destructive",
  Pending: "secondary",
  Running: "secondary",
};

const icon = computed(() => icons[status] ?? CircleQuestionMark);
const variant = computed(() => variants[status] ?? "default");

// Check if we have any datetime info to show in tooltip
const hasDateTimeInfo = computed(() => started_at || completed_at);
</script>

<template>
  <TooltipProvider v-if="hasDateTimeInfo">
    <Tooltip>
      <TooltipTrigger as-child>
        <Badge :variant="variant" class="w-fit cursor-help">
          <component :is="icon" class="w-4 h-4 mr-1" />
          {{ status }}
        </Badge>
      </TooltipTrigger>
      <TooltipContent class="max-w-xs">
        <div class="space-y-1">
          <div v-if="started_at" class="flex items-center gap-2">
            <span class="font-medium">Started:</span>
            <DateTimeCell :datetime="started_at" />
          </div>
          <div v-if="completed_at" class="flex items-center gap-2">
            <span class="font-medium">Completed:</span>
            <DateTimeCell :datetime="completed_at" />
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>

  <!-- Fallback for when there's no datetime info -->
  <Badge v-else :variant="variant" class="w-fit">
    <component :is="icon" class="w-4 h-4 mr-1" />
    {{ status }}
  </Badge>
</template>
