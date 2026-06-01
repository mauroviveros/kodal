import type { AdminMedal, Enums } from "@/interfaces";
import { MEDAL_STATUS_LABELS, PET_STATUS_LABELS } from "@/constants/labels";
import type { ColumnDef } from "@tanstack/react-table";
import { cn, formatDate } from "@/utils";
import { Badge } from "@/components/shadcn/badge";

export const columns: ColumnDef<AdminMedal>[] = [
  {
    accessorFn: (row) => row.pet?.name ?? null,
    id: "pet_name",
    header: "Mascota",
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header: "Medalla",
    enableSorting: true,
    cell: ({ row }) => {
      const status = row.original.status;
      const { label, badge } = MEDAL_STATUS_LABELS[status];
      return (
        <div className="flex justify-center">
          <Badge className={cn(`w-full text-center uppercase`, badge)}>{label}</Badge>
        </div>
      )
    },
  },
  {
    accessorFn: (row) => row.pet?.status ?? null,
    id: "pet_status",
    header: "Estado",
    enableSorting: true,
    cell: ({ getValue }) => {
      const status = getValue() as Enums<"PET_STATUS"> | null;
      if (!status) return "";
      const { label, badge } = PET_STATUS_LABELS[status];
      return (
        <div className="flex justify-center">
          <Badge className={cn(`w-full text-center uppercase`, badge)}>{label}</Badge>
        </div>
      );
    },
  },
  {
    accessorFn: (row) => row.pet?.created_at ?? null,
    id: "pet_created_at",
    header: "Fecha de registro",
    enableSorting: true,
    cell: ({ getValue }) => {
      if (!getValue()) return "";
      const date = new Date(getValue() as string);
      return <div className="text-center">{formatDate(date)}</div>;
    },
  },
  {
    accessorFn: (row) => row.owner?.full_name ?? null,
    id: "owner_name",
    header: "Dueño",
    enableSorting: true,
    cell: ({ getValue }) => getValue() ?? "—",
  }
]
