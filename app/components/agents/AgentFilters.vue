<script setup lang="ts">
import { useDataTable } from "~/components/ui/data-table";
import { Input } from "~/components/ui/input";
import { Label } from "#components";
import { Card, CardHeader, CardTitle, CardContent } from "~/components/ui/card";
import { FilterIcon, SearchIcon } from "lucide-vue-next";
import type { Agent } from ".";

const { table } = useDataTable<Agent, unknown>();

const searchId = useId();
</script>
<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex flex-row gap-2 items-center font-semibold">
        <FilterIcon class="h-5 w-auto" />
        Filters
      </CardTitle>
    </CardHeader>
    <CardContent class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="flex flex-col gap-2">
        <Label :for="searchId">Search</Label>
        <div class="relative w-full max-w-sm items-center">
          <Input
            :id="searchId"
            type="text"
            placeholder="Search agents..."
            class="pl-8"
            :model-value="table.getColumn('name')?.getFilterValue() as string"
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
    </CardContent>
  </Card>
</template>
