<script setup>
definePageMeta({
  breadcrumb: `Agent`,
  title: "Agent",
});

useHead({
  title: "Agent",
});
const route = useRoute();
</script>
<template>
  <div>
    <h1
      class="text-red-500 text-7xl font-semibold absolute flex items-center justify-center inset-0"
    >
      Agents {{ route?.params.id }}
    </h1>
  </div>
</template>
