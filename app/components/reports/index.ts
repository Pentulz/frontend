export type Report = {
  id: string;
  created_at: Date | null;
  status: string | null;
  risk_level: string | null;
};

export { default as ReportsTable } from "./ReportsTable.vue";
