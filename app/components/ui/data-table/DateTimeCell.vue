<script setup lang="ts">
type Props = {
  datetime?: Date;
};

const { datetime = null } = defineProps<Props>();
</script>

<template>
  <div class="flex flex-col">
    <template v-if="datetime">
      <NuxtTime :datetime class="text-sm font-medium" />
      <NuxtTime
        :datetime
        hour="2-digit"
        minute="2-digit"
        second="2-digit"
        class="text-sm font-medium text-muted-foreground"
      />
    </template>
    <p v-else>-</p>
  </div>
</template>
