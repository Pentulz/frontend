<script setup lang="ts">
import { Container, Monitor, PcCase, Server } from "lucide-vue-next";
import type { Component } from "vue";

type Props = {
  type: string;
};

const props = defineProps<Props>();

const icons: { [key: string]: Component } = {
  Container: Container,
  Server: Server,
  Workstation: Monitor,
};

const icon = computed(() => icons[props.type] ?? PcCase);
</script>

<template>
  <div class="flex flex-row gap-2 items-center">
    <component :is="icon" class="h-4 w-auto" />
    {{ props.type }}
  </div>
</template>
