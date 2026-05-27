import type { AdminMedal } from "@/interfaces";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function MedalsTable({
  data,
} : { data: AdminMedal[] }) {
  return (
    <DataTable columns={columns} data={data} />
  )
}
