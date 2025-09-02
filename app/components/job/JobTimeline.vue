<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent, Badge } from "#components";
import { ClockIcon, CheckIcon } from "lucide-vue-next";

type TimelineItem = {
  title: string;
  subtitle?: string;
  at?: string;
  chip?: string | null;
};

defineProps<{ items: TimelineItem[] }>();
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <ClockIcon class="w-5 h-5" />
        <span>Timeline</span>
      </CardTitle>
    </CardHeader>

    <!-- Ligne + items -->
    <CardContent class="relative pt-2 pb-2">
      <!-- ligne verticale (pile sous l'axe des pastilles) -->
      <div class="absolute left-8 top-5 bottom-5 w-px bg-neutral-200"></div>

      <div class="flex flex-col gap-7">
        <div
          v-for="(t, i) in items"
          :key="i"
          class="grid grid-cols-[56px_1fr_auto] items-start gap-3"
        >
          <!-- pastille -->
          <div class="flex items-center justify-center">
            <span
              class="inline-flex items-center justify-center w-9 h-9 rounded-full border border-neutral-200 bg-white"
            >
              <CheckIcon class="w-5 h-5 text-emerald-600" />
            </span>
          </div>

          <!-- contenu -->
          <div class="min-w-0">
            <div class="text-sm font-medium">{{ t.title }}</div>
            <div v-if="t.subtitle" class="text-xs text-muted-foreground">
              {{ t.subtitle }}
            </div>
            <div v-if="t.at" class="text-xs text-muted-foreground mt-1">
              {{ t.at }}
            </div>
          </div>

          <!-- chip -->
          <div class="pt-1">
            <Badge
              v-if="t.chip"
              variant="secondary"
              class="h-6 text-xs rounded-full px-2"
            >
              {{ t.chip }}
            </Badge>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
