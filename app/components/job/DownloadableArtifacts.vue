<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from "#components";
import { DownloadIcon, FileTextIcon } from "lucide-vue-next";
import DownloadBlob from "../report/DownloadBlob.vue";

type Artifact = {
  name: string;
  createdAt: Date;
  results: Blob;
};

const { artifact = undefined } = defineProps<{ artifact?: Artifact }>();

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
        <DownloadIcon class="w-5 h-5" />
        <span>Downloadable Artifact</span>
      </CardTitle>
    </CardHeader>

    <ScrollArea>
      <CardContent class="px-2 overflow-scroll">
        <table class="w-full text-sm">
          <!-- Header -->
          <thead>
            <tr class="text-xs text-muted-foreground text-left">
              <th class="px-4 py-2 font-medium">File</th>
              <th class="px-4 py-2 font-medium">Size</th>
              <th class="px-4 py-2 font-medium text-right">Created</th>
              <th class="px-4 py-2 font-medium text-right">Action</th>
            </tr>
          </thead>

          <!-- Body -->
          <tbody class="divide-y">
            <tr v-if="artifact" class="hover:bg-muted/30">
              <!-- File -->
              <td class="px-4 py-3">
                <div class="flex items-center gap-2 min-w-0">
                  <FileTextIcon
                    class="w-4 h-4 text-muted-foreground shrink-0"
                  />
                  <span class="truncate font-medium">{{ artifact.name }}</span>
                </div>
              </td>

              <!-- Size -->
              <td class="px-4 py-3">
                {{ humanBytes(artifact.results.size) }}
              </td>

              <!-- Created -->
              <td class="px-4 py-3 text-right">
                <NuxtTime
                  v-if="artifact.createdAt"
                  :datetime="artifact.createdAt"
                  day="2-digit"
                  month="2-digit"
                  year="numeric"
                  hour="2-digit"
                  minute="2-digit"
                  second="2-digit"
                  locale="fr-FR"
                />
              </td>

              <!-- Action -->
              <td class="px-4 py-3 text-right">
                <DownloadBlob :blob="artifact.results" :name="artifact.name" />
              </td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </ScrollArea>
  </Card>
</template>
