<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent, Button } from "#components";
import { PlayIcon, SettingsIcon, BookmarkIcon } from "lucide-vue-next";
import AgentSetupInstructions from "~/components/agent/AgentSetupInstructions.vue";

const showSetup = ref(false);

// mocks
const agentKey = "i2fcbogcbc4eu618ycac3";
const backendUrl = "https://pentulz.xyz/";
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <BookmarkIcon class="w-5 h-5" />
        <span>Quick Actions</span>
      </CardTitle>
    </CardHeader>

    <CardContent class="flex flex-col gap-2">
      <Button variant="outline" class="w-full justify-start gap-2">
        <PlayIcon class="w-4 h-4" />
        Start New Job
      </Button>

      <Button
        variant="outline"
        class="w-full justify-start gap-2"
        @click="showSetup = true"
      >
        <SettingsIcon class="w-4 h-4" />
        Configure Agent
      </Button>
    </CardContent>
  </Card>

  <!-- Popup -->
  <AgentSetupInstructions
    :open="showSetup"
    :on-close="() => (showSetup = false)"
    :agent-key="agentKey"
    :backend-url="backendUrl"
  />
</template>
