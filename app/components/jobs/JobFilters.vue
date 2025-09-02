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
import type { Job } from "~/composables/use-api";

const { table } = useDataTable<Job, unknown>();

// Since status is computed from started_at/completed_at, provide manual status options
// This avoids calling getFacetedUniqueValues() which is causing the error
const statuses = computed(() => {
  // Don't try to get faceted values for computed columns - just return the possible values
  return ["Pending", "Running", "Completed"];
});

const agents = computed(() =>
  Array.from<string>(
    table
      .getColumn("agent_id")
      ?.getFacetedUniqueValues()
      .keys()
      .filter(Boolean) ?? [],
  ),
);

const searchId = useId();
const statusId = useId();
const agentId = useId();
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
            placeholder="Search jobs by name..."
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
        <Label :for="statusId">Status</Label>
        <div class="flex flex-row gap-2">
          <Select
            v-if="statuses.length > 0"
            multiple
            :model-value="
              (table.getColumn('status')?.getFilterValue() as string[]) ?? []
            "
            @update:model-value="
              (value) => table.getColumn('status')?.setFilterValue(value)
            "
          >
            <SelectTrigger class="lg:max-w-sm w-full">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                v-for="status in statuses"
                :key="status"
                :value="status"
              >
                {{ status }}
              </SelectItem>
            </SelectContent>
          </Select>
          <div v-else class="flex items-center text-sm text-muted-foreground">
            No statuses available
          </div>
          <Button
            variant="outline"
            size="icon"
            :disabled="statuses.length === 0"
            @click="table.getColumn('status')?.setFilterValue(undefined)"
          >
            <RotateCcwIcon class="size-4" />
          </Button>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <Label :for="agentId">Agent</Label>
        <div class="flex flex-row gap-2">
          <Select
            multiple
            :model-value="
              (table.getColumn('agent_id')?.getFilterValue() as string[]) ?? []
            "
            @update:model-value="
              table.getColumn('agent_id')?.setFilterValue($event)
            "
          >
            <SelectTrigger class="lg:max-w-sm w-full">
              <SelectValue
                :placeholder="
                  agents.length ? 'All agents' : 'No agents available'
                "
              />
            </SelectTrigger>
            <SelectContent v-if="agents.length">
              <SelectItem v-for="agent in agents" :key="agent" :value="agent">
                {{ agent }}
              </SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            @click="table.getColumn('agent_id')?.setFilterValue(undefined)"
          >
            <RotateCcwIcon class="size-4" />
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
