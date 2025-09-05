import { provideSSRWidth } from "@vueuse/core";

// Plugin recommended by shadcn-vue to avoid SSR issues
export default defineNuxtPlugin((nuxtApp) => {
  provideSSRWidth(1024, nuxtApp.vueApp);
});
