<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from "#components";
import { LayoutGridIcon, CheckIcon, XIcon } from "lucide-vue-next";

type Capability = { name: string; version?: string; ok?: boolean };
defineProps<{
  networkTools: Capability[];
  scripting: Capability[];
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
        <p class="text-sm text-neutral-500 font-medium">Network Tools</p>
        <div class="flex flex-col gap-2">
          <div
            v-for="t in networkTools"
            :key="t.name"
            class="flex items-center justify-between rounded-xl border bg-muted/30 px-3 py-2"
          >
            <div class="flex items-center gap-3">
              <!-- état -->
              <span
                class="inline-flex items-center justify-center w-6 h-6 rounded-full border"
                :class="
                  t.ok === false
                    ? 'border-rose-200 text-rose-600 bg-white'
                    : 'border-emerald-200 text-emerald-600 bg-white'
                "
              >
                <component
                  :is="t.ok === false ? XIcon : CheckIcon"
                  class="w-4 h-4"
                />
              </span>
              <span class="text-sm">{{ t.name }}</span>
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

      <!-- Scripting -->
      <div class="flex flex-col gap-3">
        <p class="text-sm text-neutral-500 font-medium">Scripting</p>
        <div class="flex flex-col gap-2">
          <div
            v-for="s in scripting"
            :key="s.name"
            class="flex items-center justify-between rounded-xl border bg-muted/30 px-3 py-2"
          >
            <div class="flex items-center gap-3">
              <span
                class="inline-flex items-center justify-center w-6 h-6 rounded-full border"
                :class="
                  s.ok === false
                    ? 'border-rose-200 text-rose-600 bg-white'
                    : 'border-emerald-200 text-emerald-600 bg-white'
                "
              >
                <component
                  :is="s.ok === false ? XIcon : CheckIcon"
                  class="w-4 h-4"
                />
              </span>
              <span class="text-sm">{{ s.name }}</span>
            </div>

            <span
              v-if="s.version"
              class="text-[11px] rounded-full border bg-white px-2 py-0.5 text-muted-foreground"
            >
              {{ s.version }}
            </span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
