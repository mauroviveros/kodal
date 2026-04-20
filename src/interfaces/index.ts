import type { ColumnDef } from "@tanstack/react-table";
import type { Control, FieldErrors, FieldValues } from "react-hook-form";
export * from "./database";

export interface FormProps<T extends FieldValues> {
  control: Control<T>;
  errors: FieldErrors<T>
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}
