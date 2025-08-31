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
  status: string | null;
};

const { status } = defineProps<Props>();

const icons: { [key: string]: Component } = {
  completed: CircleCheckBig,
  failed: CircleX,
  pending: CircleDashed,
  running: Loader,
  unknown: CircleQuestionMark,
} as const;

const variants: { [key: string]: BadgeVariants["variant"] } = {
  completed: "outline",
  failed: "destructive",
  pending: "secondary",
  running: "secondary",
  unknown: "default",
} as const;

const icon = computed(() => icons[status ?? "unknown"] ?? icons["unknown"]);

const variant = computed(() => variants[status ?? "unknown"]);
</script>
<template>
  <Badge v-if="status" :variant="variant">
    <component :is="icon" class="w-5 h-5" />
    {{ status }}
  </Badge>
</template>
