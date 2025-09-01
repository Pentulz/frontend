<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Separator,
  Badge,
} from "#components";
import { ServerIcon } from "lucide-vue-next";

export type Props = {
  description: string;
  type: string;
  os: string;
  ip: string;
  uptime: string;
  lastSeen: Date;
};

const props = defineProps<Props>();
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex flex-row gap-2">
        <ServerIcon class="w-5" />
        <span>Agent details</span>
      </CardTitle>
    </CardHeader>
    <CardContent class="flex flex-col gap-3">
      <div class="flex flex-col gap-2">
        <p class="text-sm leading-5 font-medium text-neutral-500">
          Description
        </p>
        <p class="text-base leading-6 font-normal">{{ props.description }}</p>
      </div>
      <Separator />
      <div class="grid grid-cols-1 2xl:grid-cols-2 gap-3">
        <div class="flex flex-col gap-3">
          <p class="text-sm leading-5 font-medium text-neutral-500">
            System Information
          </p>
          <div class="flex flex-col gap-2">
            <div class="flex flex-row gap-2 justify-between items-center">
              <p class="text-sm leading-5 font-medium text-neutral-500">
                Type:
              </p>
              <Badge variant="outline">{{ props.type }}</Badge>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
