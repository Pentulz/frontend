<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Button,
} from "#components";
import {
  ArrowRightIcon,
  Grid2x2Icon,
  ContainerIcon,
  AppleIcon,
} from "lucide-vue-next";

import type { Agent } from "~/composables/use-api";

export type ActiveAgent = Pick<
  Agent,
  "id" | "name" | "hostname" | "description" | "platform" | "available_tools"
> & {
  status: "busy" | "idle" | "offline";
};

export type Props = {
  agents?: ActiveAgent[];
};

const { agents = [] } = defineProps<Props>();

// Fonction pour obtenir la variante et le texte du badge selon le statut
const getStatusInfo = (status: string) => {
  switch (status) {
    case "busy":
      return {
        variant: "default",
        text: "busy",
        bgColor: "bg-green-100 text-green-800",
      };
    case "idle":
      return {
        variant: "secondary",
        text: "idle",
        bgColor: "bg-blue-100 text-blue-800",
      };
    case "offline":
      return {
        variant: "destructive",
        text: "offline",
        bgColor: "bg-red-100 text-red-800",
      };
    default:
      return {
        variant: "outline",
        text: status,
        bgColor: "bg-gray-100 text-gray-800",
      };
  }
};

const platform = {
  WINDOWS: {
    text: "Windows",
    icon: Grid2x2Icon,
  },
  MACOS: {
    text: "MacOS",
    icon: AppleIcon,
  },
  LINUX: {
    text: "Linux",
    icon: ContainerIcon,
  },
} as const;
</script>

<template>
  <Card>
    <CardHeader>
      <div class="flex items-center justify-between">
        <CardTitle class="text-base font-semibold">Active Agents</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          class="text-sm text-muted-foreground hover:text-foreground"
          as-child
        >
          <NuxtLink to="/agents">
            View All <ArrowRightIcon class="size-4" />
          </NuxtLink>
        </Button>
      </div>
    </CardHeader>

    <CardContent>
      <div class="space-y-4">
        <div
          v-for="agent in agents"
          :key="agent.id"
          class="flex items-center justify-between py-3 border-b border-border last:border-b-0"
        >
          <div class="flex-1">
            <div class="flex items-center gap-3">
              <div class="flex-1">
                <div class="flex items-center gap-2">
                  <div class="font-medium text-sm">{{ agent.name }}</div>
                  <Badge
                    :class="getStatusInfo(agent.status).bgColor"
                    class="text-xs px-2 py-1 rounded"
                  >
                    {{ getStatusInfo(agent.status).text }}
                  </Badge>
                </div>
                <div
                  v-if="agent.platform && platform[agent.platform]"
                  class="text-xs text-muted-foreground mt-1 flex items-center gap-2"
                >
                  <component
                    :is="platform[agent.platform].icon"
                    class="size-3"
                  />

                  {{ platform[agent.platform].text }}
                </div>
              </div>

              <div class="text-right text-xs text-muted-foreground">
                <div>
                  {{ agent.available_tools.length }} tool{{
                    agent.available_tools.length !== 1 ? "s" : ""
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
