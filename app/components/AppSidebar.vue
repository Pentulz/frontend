<script setup lang="ts">
import type { SidebarProps } from "@/components/ui/sidebar";
import {
  Shield,
  HouseIcon,
  ServerIcon,
  ClipboardListIcon,
  FileChartColumnIcon,
} from "lucide-vue-next";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

const props = defineProps<SidebarProps>();

// This is sample data.
const data = {
  navMain: [
    {
      label: "Pages",
      items: [
        {
          title: "Dashboard",
          url: "/",
          icon: HouseIcon,
        },
        {
          title: "Agents",
          url: "/agents",
          icon: ServerIcon,
        },
        {
          title: "Jobs",
          url: "/jobs",
          icon: ClipboardListIcon,
        },
        {
          title: "Reports",
          url: "/reports",
          icon: FileChartColumnIcon,
        },
      ],
    },
  ],
};
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <div class="flex flex-row items-center font-bold text-3xl gap-2">
        <Shield class="h-8 w-auto stroke-3" />
        <span>Pentulz</span>
      </div>
    </SidebarHeader>
    <SidebarContent class="gap-0">
      <SidebarGroup v-for="group in data.navMain" :key="group.label">
        <SidebarGroupLabel>{{ group.label }} </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in group.items" :key="item.title">
              <SidebarMenuButton as-child :is-active="false">
                <NuxtLink :to="item.url" class="flex gap-2 items-center">
                  <component :is="item.icon" v-if="item.icon" />
                  {{ item.title }}
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarRail />
  </Sidebar>
</template>
