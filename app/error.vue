<script setup lang="ts">
import type { NuxtError } from "#app";
import { Button } from "~/components/ui/button";

const { back } = useRouter();

const { error = undefined } = defineProps({
  error: Object as () => NuxtError,
});
</script>

<template>
  <NuxtLayout>
    <main
      class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8"
    >
      <div class="text-center">
        <p class="text-base font-semibold text-indigo-600">
          {{ error?.statusCode }}
        </p>
        <h1
          class="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl"
        >
          {{ error?.statusMessage }}
        </h1>
        <p
          class="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8"
        ></p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <Button as-child>
            <NuxtLink to="/">Dashboard</NuxtLink>
          </Button>

          <Button variant="outline" @click="back"> Go back </Button>
        </div>
      </div>
    </main>
  </NuxtLayout>
</template>
