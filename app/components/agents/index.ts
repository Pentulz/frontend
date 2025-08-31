export interface Agent {
  id: string;
  name: string;
  description: string;
  hostname: string;
  status: string;
  type: string;
  os: string;
  ip: string;
  available_tools: string[];
  jobs: number;
}

export { default as AgentsTable } from "./AgentsTable.vue";
