<!--
  NOTE: The landing page must use static content since it will be prerendered.
  Any dynamic page should be wrapped in `<ClientOnly></ClientOnly>`
-->
<script setup>
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

definePageMeta({
  breadcrumb: "Dashboard",
  title: "Dashboard",
});
</script>
<template>
  <ScrollArea class="w-full h-full">
    <div class="grid grid-cols-4 p-16 gap-16">
      <Card v-for="n in 100" :key="n">
        <CardHeader>
          <CardTitle>Card Title {{ n }}</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent> Card Content </CardContent>
        <CardFooter> Card Footer </CardFooter>
      </Card>
    </div>
  </ScrollArea>
</template>
