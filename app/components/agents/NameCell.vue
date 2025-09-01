<script setup lang="ts">
type Props = {
  name: string;
  id: string;
};

const { name, id } = defineProps<Props>();
</script>

<template>
  <div class="flex flex-col">
    <p class="text-sm font-medium">{{ name }}</p>
    <span class="text-sm font-medium text-muted-foreground">{{ id }}</span>
  </div>
</template>
