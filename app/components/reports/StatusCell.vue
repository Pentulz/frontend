<script setup lang="ts">
import {
  CircleCheckBig,
  CircleQuestionMark,
  CircleX,
  Loader,
  CircleDashed,
} from "lucide-vue-next";
import type { Component } from "vue";
import type { BadgeVariants } from "../ui/badge";
type Props = {
  status: string;
};

const { status } = defineProps<Props>();

const icons: { [key: string]: Component } = {
  completed: CircleCheckBig,
  failed: CircleX,
  pending: CircleDashed,
  running: Loader,
};

const variants: { [key: string]: BadgeVariants["variant"] } = {
  completed: "outline",
  failed: "destructive",
  pending: "secondary",
  running: "secondary",
};

const icon = computed(() => icons[status] ?? CircleQuestionMark);

const variant = computed(() => variants[status] ?? "default");
</script>
<template>
  <Badge :variant="variant">
    <component :is="icon" class="w-5 h-5" />
    {{ status }}
  </Badge>
</template>
