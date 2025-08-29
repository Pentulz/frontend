<script setup lang="ts">
import { Toaster } from "~/components/ui/sonner";
import "vue-sonner/style.css";
</script>
<template>
  <NuxtRouteAnnouncer />
  <Toaster class="pointer-events-auto" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
