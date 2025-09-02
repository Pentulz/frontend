<script setup lang="ts">
import { DownloadIcon } from "lucide-vue-next";

const { blob, name } = defineProps<{ blob: Blob; name: string }>();

const onClick = () => {
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.rel = "noopener";
  a.style.display = "none";
  a.target = "_blank";
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
</script>
<template>
  <Button variant="outline" size="icon" @click="onClick">
    <DownloadIcon class="size-4" />
  </Button>
</template>
