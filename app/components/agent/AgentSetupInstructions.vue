<script setup lang="ts">
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "#components";
import { TerminalIcon, ClipboardIcon } from "lucide-vue-next";

const config = useRuntimeConfig();

const props = defineProps<{
  open: boolean;
  onClose: () => void;
  agentKey: string;
}>();

function copy(text: string) {
  navigator.clipboard.writeText(text);
}

// 🟢 Préparation des commandes
const dockerCmd = computed(
  () =>
    `docker run --rm ghcr.io/pentulz/agent:latest -e KEY="${props.agentKey}" -e BACKEND_URL="${config.public.apiBase}"`,
);

const cliCmd = computed(
  () =>
    `pentulz_agent --key "${props.agentKey}" --backend "${config.public.apiBase}"`,
);
</script>

<template>
  <Dialog :open="props.open" @update:open="props.onClose()">
    <DialogContent class="max-w-2xl bg-orange-50">
      <DialogHeader>
        <DialogTitle class="flex items-center gap-2">
          <TerminalIcon class="w-5 h-5" />
          Agent Setup Instructions
        </DialogTitle>
      </DialogHeader>

      <div class="flex flex-col gap-6 py-2">
        <!-- Option 1 -->
        <div class="flex flex-col gap-2">
          <p class="font-medium">Option 1: Docker Setup</p>
          <div
            class="relative bg-neutral-900 text-green-400 rounded-md p-3 font-mono text-sm"
          >
            <code>{{ dockerCmd }}</code>
            <button
              class="absolute top-2 right-2 text-neutral-400 hover:text-white"
              @click="copy(dockerCmd)"
            >
              <ClipboardIcon class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Option 2 -->
        <div class="flex flex-col gap-2">
          <p class="font-medium">Option 2: CLI Setup</p>
          <button class="border rounded-md px-3 py-2 text-sm w-fit" as-child>
            <NuxtLink to="https://github.com/Pentulz/frontend/releases">
              Download from GitHub Releases
            </NuxtLink>
          </button>
          <div
            class="relative bg-neutral-900 text-green-400 rounded-md p-3 font-mono text-sm"
          >
            <code>{{ cliCmd }}</code>
            <button
              class="absolute top-2 right-2 text-neutral-400 hover:text-white"
              @click="copy(cliCmd)"
            >
              <ClipboardIcon class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
