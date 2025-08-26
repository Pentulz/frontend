declare module "nuxt/schema" {
  interface AppConfigInput {
    /** Api configuration */
    api: {
      /** The base url the the api */
      url?: string;
    };
  }
}

// It is always important to ensure you import/export something when augmenting a type
export {};
