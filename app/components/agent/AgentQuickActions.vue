<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent, Button } from "#components";
import { PlayIcon, SettingsIcon, BookmarkIcon } from "lucide-vue-next";
import AgentSetupInstructions from "~/components/agent/AgentSetupInstructions.vue";
import CreateJob from "../forms/CreateJob.vue";

type Props = {
  agentKey: string;
  agentId: string;
};

const { agentKey, agentId } = defineProps<Props>();
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
      <CreateJob :agent-id="agentId">
        <Button variant="outline" class="w-full justify-start gap-2">
          <PlayIcon class="w-4 h-4" />
          Start New Job
        </Button>
      </CreateJob>

      <AgentSetupInstructions :agent-key="agentKey">
        <Button variant="outline" class="w-full justify-start gap-2">
          <SettingsIcon class="w-4 h-4" />
          Configure Agent
        </Button>
      </AgentSetupInstructions>
    </CardContent>
  </Card>

  <!-- Popup -->
</template>
