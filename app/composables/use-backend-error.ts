import type { ClientError } from "~/lib/api";

export const useBackendError = (
  error: Ref<ClientError | undefined, ClientError | undefined>,
) => {
  watch(error, () => {
    if (error.value) {
      const apiErrors = error.value.data?.errors || [];
      if (apiErrors.length) {
        const firstError = apiErrors[0];
        throw createError({
          statusCode: parseInt(firstError.status, 10),
          statusMessage: firstError.detail,
          fatal: true,
        });
      }
    }
  });
};
