import type { ColumnDef, Table } from "@tanstack/vue-table";
import type { InjectionKey } from "vue";

const tableKey = Symbol("table") as InjectionKey<
  [Table<unknown>, ColumnDef<unknown, unknown>[]]
>;

export function provideDataTable<TData, TValue>(
  table: Table<TData>,
  columns: ColumnDef<TData, TValue>[],
) {
  provide(tableKey, [
    table as Table<unknown>,
    columns as ColumnDef<unknown, unknown>[],
  ]);
}

export function useDataTable<TData, TValue>() {
  const data = inject(tableKey);
  if (!data) throw new Error("No DataTable provided");
  return data as [Table<TData>, ColumnDef<TData, TValue>[]];
}
