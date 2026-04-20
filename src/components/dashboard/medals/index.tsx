import type { Tables } from "@/interfaces";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function MedalsTable({
  data,
} : { data: Tables<'medals'>[] }) {
  return (
    <DataTable columns={columns} data={data} />
  )
}
