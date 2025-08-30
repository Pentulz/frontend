export type Report = {
  id: string;
  name: string;
  status: string;
  hosts?: number;
  vulnerabilities?: {
    count: number;
    highest: string;
  };
  jobs: number;
  created: Date;
};

export { default as ReportsTable } from "./ReportsTable.vue";
