<script setup lang="ts">
import { useDataTable } from "~/components/ui/data-table";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
import { Label, Button } from "#components";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { FilterIcon, SearchIcon, RotateCcwIcon } from "lucide-vue-next";
import type { Agent } from ".";

const { table } = useDataTable<Agent, unknown>();

const platforms = computed(() =>
  Array.from<string>(
    table.getColumn("platform")?.getFacetedUniqueValues().keys() ?? [],
  ),
);

const availableTools = computed(() => {
  const column = table.getColumn("available_tools");
  if (!column) return [];

  const facetedValues = column.getFacetedUniqueValues();
  const allToolCommands = Array.from(facetedValues.keys());

  return Array.from(new Set(allToolCommands)).sort();
});

const searchId = useId();
const searchByHostname = useId();
</script>
<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex flex-row gap-2 items-center font-semibold">
        <FilterIcon class="h-5 w-auto" />
        Filters
      </CardTitle>
    </CardHeader>
    <CardContent class="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <div class="flex flex-col gap-2">
        <Label :for="searchId">Search</Label>
        <div class="relative w-full max-w-sm items-center">
          <Input
            :id="searchId"
            type="text"
            placeholder="Search agents by name..."
            class="pl-8"
            @update:model-value="
              table.getColumn('name')?.setFilterValue($event)
            "
          />
          <span
            class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
          >
            <SearchIcon class="size-4 text-muted-foreground" />
          </span>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <Label :for="searchByHostname">Search</Label>
        <div class="relative w-full max-w-sm items-center">
          <Input
            :id="searchByHostname"
            type="text"
            placeholder="Search agents by hostname..."
            class="pl-8"
            @update:model-value="
              table.getColumn('hostname')?.setFilterValue($event)
            "
          />
          <span
            class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
          >
            <SearchIcon class="size-4 text-muted-foreground" />
          </span>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <Label>Platform</Label>
        <div class="flex flex-row gap-2">
          <Select
            multiple
            :model-value="
              (table.getColumn('platform')?.getFilterValue() as string[]) ?? []
            "
            @update:model-value="
              table.getColumn('platform')?.setFilterValue($event)
            "
          >
            <SelectTrigger class="lg:max-w-sm w-full">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="platform in platforms"
                :key="platform"
                :value="platform"
              >
                {{ platform }}
              </SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            @click="table.getColumn('platform')?.setFilterValue(undefined)"
          >
            <RotateCcwIcon class="size-4" />
          </Button>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <Label>Available tools</Label>
        <div class="flex flex-row gap-2">
          <Select
            multiple
            :model-value="
              (table
                .getColumn('available_tools')
                ?.getFilterValue() as string[]) ?? []
            "
            @update:model-value="
              table.getColumn('available_tools')?.setFilterValue($event)
            "
          >
            <SelectTrigger class="lg:max-w-sm w-full">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="tool in availableTools"
                :key="tool"
                :value="tool"
              >
                {{ tool }}
              </SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            @click="
              table.getColumn('available_tools')?.setFilterValue(undefined)
            "
          >
            <RotateCcwIcon class="size-4" />
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
