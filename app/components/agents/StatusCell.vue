<script setup lang="ts">
import { CircleCheckBig, CircleQuestionMark, CircleX } from "lucide-vue-next";
import type { Component } from "vue";
import type { BadgeVariants } from "../ui/badge";
type Props = {
  status: string;
};

const { status } = defineProps<Props>();

const icons: { [key: string]: Component } = {
  Online: CircleCheckBig,
  Offline: CircleX,
};

const variants: { [key: string]: BadgeVariants["variant"] } = {
  Online: "outline",
  Offline: "destructive",
};

const icon = computed(() => icons[status] ?? CircleQuestionMark);

const variant = computed(() => variants[status] ?? "secondary");
</script>
<template>
  <Badge :variant="variant">
    <component :is="icon" class="w-5 h-5" />
    {{ status }}
  </Badge>
</template>
