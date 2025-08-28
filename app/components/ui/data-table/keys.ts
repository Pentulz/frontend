import type { ColumnDef, Table } from "@tanstack/vue-table";
import type { InjectionKey } from "vue";

const tableKey = Symbol("table") as InjectionKey<{
  table: Table<unknown>;
  columns: ColumnDef<unknown, unknown>[];
}>;

export function provideDataTable<TData, TValue>(
  table: Table<TData>,
  columns: ColumnDef<TData, TValue>[],
) {
  provide(tableKey, {
    table: table as Table<unknown>,
    columns: columns as ColumnDef<unknown, unknown>[],
  });
}

export function useDataTable<TData = unknown, TValue = unknown>() {
  const data = inject(tableKey);
  if (!data) throw new Error("No DataTable provided");
  return data as { table: Table<TData>; columns: ColumnDef<TData, TValue>[] };
}
