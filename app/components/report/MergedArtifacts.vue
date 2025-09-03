<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from "#components";
import { FileTextIcon } from "lucide-vue-next";
import DownloadBlob from "./DownloadBlob.vue";

type Artifact = {
  name: string;
  id: string;
  results: Blob;
};

defineProps<{ artifacts: Artifact[] }>();

const humanBytes = (bytes: number) => {
  if (!Number.isFinite(bytes)) return "NaN";
  const units = ["B", "KB", "MB", "GB"];
  let val = Math.abs(bytes);
  let i = 0;

  while (val >= 1024 && i < units.length - 1) {
    val /= 1024;
    i++;
  }

  const dp = i === 0 ? 0 : 2; // no decimals for plain bytes
  const num = i === 0 ? Math.round(val) : Number(val.toFixed(dp));
  return `${num} ${units[i]}`;
};
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <FileTextIcon class="w-5 h-5" />
        <span>Merged Artifacts</span>
      </CardTitle>
    </CardHeader>

    <CardContent class="px-2 overflow-scroll">
      <table class="w-full text-sm">
        <!-- Header -->
        <thead>
          <tr class="text-xs text-muted-foreground text-left">
            <th class="px-4 py-2 font-medium">Name</th>
            <th class="px-4 py-2 font-medium">Size</th>
            <th class="px-4 py-2 font-medium">Source Job</th>
            <th class="px-4 py-2 font-medium text-right">Action</th>
          </tr>
        </thead>

        <!-- Body -->
        <tbody class="divide-y">
          <tr v-for="a in artifacts" :key="a.name" class="hover:bg-muted/30">
            <!-- File Name -->
            <td class="px-4 py-3">
              <div class="flex items-center gap-2 min-w-0">
                <FileTextIcon class="w-4 h-4 text-muted-foreground shrink-0" />
                <span class="truncate font-medium">{{ a.name }}</span>
              </div>
            </td>

            <!-- Size -->
            <td class="px-4 py-3">
              {{ humanBytes(a.results.size) }}
            </td>

            <!-- Source Job -->
            <td class="px-4 py-3">
              <NuxtLink :to="`/jobs/${a.id}`">
                <span class="font-mono hover:underline">{{ a.id }}</span>
              </NuxtLink>
            </td>

            <!-- Action -->
            <td class="px-4 py-3 text-right">
              <DownloadBlob :blob="a.results" :name="a.name" />
            </td>
          </tr>
        </tbody>
      </table>
    </CardContent>
  </Card>
</template>
