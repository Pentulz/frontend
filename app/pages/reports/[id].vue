<script setup>
definePageMeta({
  breadcrumb: `Report`,
  title: "Report",
});

useHead({
  title: "Report",
});
const route = useRoute();
</script>
<template>
  <div>
    <h1
      class="text-red-500 text-7xl font-semibold absolute flex items-center justify-center inset-0"
    >
      Reports {{ route.params.id }}
    </h1>
  </div>
</template>
