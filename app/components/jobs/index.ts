import type { Entity } from "~/lib/api";

export type Job = {
  id: string;
  started_at?: Date;
  completed_at?: Date;
  created_at?: Date;
  status: "Completed" | "Running" | "Pending";
} & Omit<
  Entity<"jobs">["attributes"],
  "started_at" | "completed_at" | "created_at"
>;

export { default as JobsTable } from "./JobsTable.vue";
