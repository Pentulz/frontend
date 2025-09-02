<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent, Badge } from "#components";
import { DownloadIcon, FileTextIcon } from "lucide-vue-next";

type Artifact = {
  name: string; // "nmap_scan.xml"
  type: string; // "data" | "logs" | ...
  size: string; // "45.2 MB"
  created: string; // "2025-08-22 19:23:99"
  href?: string; // lien de téléchargement
};

defineProps<{ artifacts: Artifact[] }>();
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <DownloadIcon class="w-5 h-5" />
        <span>Downloadable Artifacts</span>
      </CardTitle>
    </CardHeader>

    <CardContent class="p-0">
      <table class="w-full text-sm">
        <!-- Header -->
        <thead>
          <tr class="text-xs text-muted-foreground text-left">
            <th class="px-4 py-2 font-medium">File</th>
            <th class="px-4 py-2 font-medium">Type</th>
            <th class="px-4 py-2 font-medium">Size</th>
            <th class="px-4 py-2 font-medium text-right">Created</th>
            <th class="px-4 py-2 font-medium text-right">Action</th>
          </tr>
        </thead>

        <!-- Body -->
        <tbody class="divide-y">
          <tr v-for="a in artifacts" :key="a.name" class="hover:bg-muted/30">
            <!-- File -->
            <td class="px-4 py-3">
              <div class="flex items-center gap-2 min-w-0">
                <FileTextIcon class="w-4 h-4 text-muted-foreground shrink-0" />
                <span class="truncate font-medium">{{ a.name }}</span>
              </div>
            </td>

            <!-- Type -->
            <td class="px-4 py-3">
              <Badge variant="secondary" class="text-[11px]">{{
                a.type
              }}</Badge>
            </td>

            <!-- Size -->
            <td class="px-4 py-3">
              {{ a.size }}
            </td>

            <!-- Created -->
            <td class="px-4 py-3 text-right">
              {{ a.created }}
            </td>

            <!-- Action -->
            <td class="px-4 py-3 text-right">
              <a
                :href="a.href || '#'"
                class="inline-flex items-center justify-center w-7 h-7 border rounded-md"
                aria-label="Download artifact"
              >
                <DownloadIcon class="w-4 h-4" />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </CardContent>
  </Card>
</template>
