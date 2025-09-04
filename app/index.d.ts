declare module "nuxt/schema" {
  interface AppConfigInput {
    refresh: number;
    activeMinutesThreshold: number;
  }
}

// It is always important to ensure you import/export something when augmenting a type
export {};
