<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  Input,
  Label,
} from "#components";
import { TerminalIcon, ClipboardIcon } from "lucide-vue-next";

const config = useRuntimeConfig();

const props = defineProps<{
  agentKey: string;
}>();

function copy(text: string) {
  navigator.clipboard.writeText(text);
}
const timeout = ref<number>(30);

const args = computed(
  () =>
    `\\\n--token "${props.agentKey}" \\\n--api-url "${config.public.apiBase}/api/v1" \\\n--refresh-timeout ${timeout.value ?? 1}`,
);

// 🟢 Préparation des commandes
const dockerCmd = computed(
  () =>
    `docker run --rm -it \\\n--name pentulz_agent \\\n--user root \\\n--network host\\\nghcr.io/pentulz/agent:latest ${args.value}`,
);

const cliCmd = computed(() => `agent ${args.value}`);
const timeoutId = useId();
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <slot />
    </DialogTrigger>
    <DialogContent class="max-w-2xl bg-orange-50">
      <DialogHeader>
        <DialogTitle class="flex items-center gap-2">
          <TerminalIcon class="w-5 h-5" />
          Agent Setup
        </DialogTitle>
        <DialogDescription>
          Instructions on how to setup the agent on a machine
        </DialogDescription>
      </DialogHeader>

      <div class="flex flex-col gap-6 py-2">
        <div class="flex flex-col gap-2">
          <div class="flex flex-col gap-2">
            <Label :for="timeoutId">Refresh rate (seconds)</Label>
            <Input
              :id="timeoutId"
              v-model="timeout"
              class="bg-background"
              type="number"
              min="1"
              placeholder="Agent refresh period in seconds"
            />
          </div>
        </div>
        <!-- Option 1 -->
        <div class="flex flex-col gap-2">
          <p class="font-medium">Option 1: Docker Setup</p>
          <div
            class="relative bg-neutral-900 text-green-400 rounded-md p-3 font-mono text-sm"
          >
            <code class="whitespace-pre-line">{{ dockerCmd }}</code>
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
          <p class="font-medium">
            Option 2: CLI Setup
            <span class="text-muted-foreground font-normal"
              >(requires admin/sudo permissions to run properly)</span
            >
          </p>
          <Button class="w-fit" as-child>
            <NuxtLink to="https://github.com/Pentulz/agent/releases">
              Download from GitHub Releases
            </NuxtLink>
          </Button>
          <div
            class="relative bg-neutral-900 text-green-400 rounded-md p-3 font-mono text-sm"
          >
            <code class="whitespace-pre-line">{{ cliCmd }}</code>
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
