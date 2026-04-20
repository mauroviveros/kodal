import type { Tables } from "@/interfaces";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Tables<'medals'>>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "alias",
    header: "Alias",
  },
  {
    accessorKey: "status",
    header: "Estado",
  }
]
