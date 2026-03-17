import type { Control, FieldErrors, FieldValues } from "react-hook-form";
export * from "./database";

export interface FormProps<T extends FieldValues> {
  control: Control<T>;
  errors: FieldErrors<T>
}
