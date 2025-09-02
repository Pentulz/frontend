<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent, Badge } from "#components";
import { ServerIcon } from "lucide-vue-next";

type Host = {
  ip: string;
  hostname: string;
  os: string;
  openPorts: number | string;
  services: string[];
};

defineProps<{ hosts: Host[] }>();
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <ServerIcon class="w-5 h-5" />
        <span>Discovered Hosts</span>
      </CardTitle>
    </CardHeader>

    <CardContent class="p-0">
      <table class="w-full text-sm">
        <!-- Header -->
        <thead>
          <tr class="text-xs text-muted-foreground text-left">
            <th class="px-4 py-2 font-medium">IP Address</th>
            <th class="px-4 py-2 font-medium">Hostname</th>
            <th class="px-4 py-2 font-medium">Operating System</th>
            <th class="px-4 py-2 font-medium">Open Ports</th>
            <th class="px-4 py-2 font-medium">Services</th>
          </tr>
        </thead>

        <!-- Body -->
        <tbody class="divide-y">
          <tr v-for="h in hosts" :key="h.ip" class="hover:bg-muted/30">
            <td class="px-4 py-3 font-mono">{{ h.ip }}</td>
            <td class="px-4 py-3 truncate">{{ h.hostname }}</td>
            <td class="px-4 py-3 truncate">{{ h.os }}</td>
            <td class="px-4 py-3">{{ h.openPorts }}</td>
            <td class="px-4 py-3">
              <div class="flex flex-wrap gap-2">
                <Badge
                  v-for="s in h.services"
                  :key="s"
                  variant="secondary"
                  class="text-[11px]"
                >
                  {{ s }}
                </Badge>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </CardContent>
  </Card>
</template>
