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
</script>
<template>
  <div class="flex flex-col">
    <ScrollArea class="w-screen h-screen">
      <div class="grid grid-cols-4 w-screen p-16 gap-16">
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
    <h1
      class="text-red-500 text-7xl font-semibold absolute flex items-center justify-center inset-0 pointer-events-none"
    >
      Dashboard
    </h1>
  </div>
</template>
