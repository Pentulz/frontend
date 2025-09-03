export const useSkeleton = (
  pending: Ref<boolean, boolean>,
  data?: Ref<unknown, unknown>,
) => {
  const isHydrating = ref(import.meta.server);
  onMounted(() => {
    isHydrating.value = false;
  });

  return computed(() => {
    if (isHydrating.value) return true;

    if (data && data.value) return false;

    return pending.value;
  });
};
