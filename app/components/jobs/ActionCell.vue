<script setup lang="ts">
import { Badge } from "#components";

import type { Job } from "~/composables/use-api";

type Props = {
  action: Job["action"];
};

const { action } = defineProps<Props>();
</script>

<template>
  <div class="flex flex-row gap-2">
    <Badge :key="action.cmd" variant="outline">
      <template v-if="action.cmd">
        {{ action.cmd }}
      </template>
      <template v-else>
        {{ action.cmd }}
      </template>
      <template v-if="action.args">
        <template v-if="Array.isArray(action.args)">
          {{ action.args.join(" ") }}
        </template>
      </template>
    </Badge>
  </div>
</template>
