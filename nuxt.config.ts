// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/test-utils",
    "shadcn-nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
    "@nuxtjs/google-fonts",
  ],
  ssr: true,
  css: ["~/assets/css/tailwind.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "~/components/ui",
  },
  site: {
    url: "https://pentulz.xyz/",
    name: "Pentulz",
  },
  runtimeConfig: {
    public: {
      apiBase: "http://localhost:8000",
    },
  },
  googleFonts: {
    families: {
      Geist: {
        wght: [400, 500, 700],
      },
      "JetBrains Mono": {
        wght: [400, 500, 700],
      },
    },
  },
  robots: {
    robotsTxt: !process.env.NUXT_APP_BASE_URL,
  },
});
