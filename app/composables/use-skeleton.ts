export const useSkeleton = (pending: Ref<boolean, boolean>) => {
  const isHydrating = ref(import.meta.server);
  onMounted(() => {
    isHydrating.value = false;
  });

  return computed(() => isHydrating.value || pending.value);
};
