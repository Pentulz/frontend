export type Job = {
  id: string;
  name: string;
  description: string;
  agent_id: string;
  action: string[];
  created_at: Date;
  started_at?: Date;
  completed_at?: Date;
  results: string[];
};

export { default as JobsTable } from "./JobsTable.vue";
