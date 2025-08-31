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

type Props = {
  started_at: string | Date | null;
  completed_at: string | Date | null;
};

const { started_at, completed_at } = defineProps<Props>();

// Compute the status based on the datetime values
const status = computed(() => {
  if (completed_at) return "Completed";
  if (started_at) return "Running";
  return "Pending";
});

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

const icon = computed(() => icons[status.value] ?? CircleQuestionMark);
const variant = computed(() => variants[status.value] ?? "default");

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
