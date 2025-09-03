import type { AsyncData } from "#app";

export const useRefresh = (data: AsyncData<unknown, unknown>[]) => {
  const config = useAppConfig();

  const pendings = data.map(({ pending }) => pending);

  const interval = computed(() => {
    return useIntervalFn(() => {
      data.forEach(({ refresh }) => refresh());
    }, config.refresh);
  });

  watchEffect(() => {
    if (pendings.some(Boolean)) return interval.value.pause();

    interval.value.resume();
  });

  return interval;
};
