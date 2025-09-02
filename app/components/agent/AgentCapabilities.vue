<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from "#components";
import { LayoutGridIcon } from "lucide-vue-next";

import type { Agent } from "~/composables/use-api";

type AvailableTool = Agent["available_tools"][0];

defineProps<{
  tools: AvailableTool[];
}>();
</script>

<template>
  <Card>
    <!-- Header -->
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <LayoutGridIcon class="w-5 h-5" />
        <span>Agent Capabilities</span>
      </CardTitle>
    </CardHeader>

    <CardContent class="flex flex-col gap-5">
      <!-- Network Tools -->
      <div class="flex flex-col gap-3">
        <p class="text-sm text-muted-foreground font-medium">Network Tools</p>
        <div class="flex flex-col gap-2">
          <div
            v-for="t in tools"
            :key="t.cmd"
            class="flex items-center justify-between rounded-xl border bg-muted/30 px-3 py-2"
          >
            <div class="flex items-center gap-3">
              <span class="text-sm">{{ t.cmd }}</span>
            </div>

            <!-- version -->
            <span
              v-if="t.version"
              class="text-[11px] rounded-full border bg-white px-2 py-0.5 text-muted-foreground"
            >
              {{ t.version }}
            </span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
