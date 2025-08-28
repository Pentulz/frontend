export interface Agent {
  id: string;
  name: string;
  status: string;
  type: string;
  os: string;
  ip: string;
  capabilities: string[];
  jobs: number;
}

export { default as AgentsTable } from "./AgentsTable.vue";
