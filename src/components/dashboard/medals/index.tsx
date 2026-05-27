import { useState } from "react"
import type { AdminMedal, Tables } from "@/interfaces";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import MedalsTableFilter from "./filters";

export default function MedalsTable({
  data,
} : { data: AdminMedal[] }) {
  const [statusFilter, setStatusFilter] = useState<Tables<'medals'>['status'] | null>('ACTIVE')

  const filteredData = statusFilter
    ? data.filter((item) => item.status === statusFilter)
    : data

  return (
    <div className="space-y-4">
      <MedalsTableFilter
        filters={{ status: statusFilter }}
        handleChangeFilterStatus={setStatusFilter}
      />
      <DataTable columns={columns} data={filteredData} />
    </div>
  )
}
