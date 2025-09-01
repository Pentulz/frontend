import type { Entity } from "~/lib/api";

export type Agent = Omit<
  Entity<"agents">["attributes"],
  "last_seen_at" | "created_at"
> & { id: string; last_seen_at?: Date; created_at?: Date };

export { default as AgentsTable } from "./AgentsTable.vue";
