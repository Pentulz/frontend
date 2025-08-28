export type Job = {
  id: string;
  name: string;
  status: string;
  agentId: string;
  tools: string[];
  started?: Date;
  duration?: string;
};

export { default as JobsTable } from "./JobsTable.vue";
