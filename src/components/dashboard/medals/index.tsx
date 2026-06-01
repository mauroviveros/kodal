import { useState, useEffect } from "react"
import type { AdminMedal, Tables } from "@/interfaces";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import MedalsTableFilter from "./filters";

const VALID_STATUSES: string[] = ['ACTIVE', 'MANUFACTURED', 'CREATED']

function getInitialStatus(): Tables<'medals'>['status'] | null {
  const param = new URLSearchParams(window.location.search).get('status')
  if (!param || param === 'all') return null
  if (VALID_STATUSES.includes(param)) return param as Tables<'medals'>['status']
  return 'ACTIVE'
}

export default function MedalsTable({
  data,
} : { data: AdminMedal[] }) {
  const [statusFilter, setStatusFilter] = useState<Tables<'medals'>['status'] | null>(getInitialStatus)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (statusFilter === null) {
      params.delete('status')
    } else {
      params.set('status', statusFilter)
    }
    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname
    window.history.replaceState(null, '', newUrl)
  }, [statusFilter])

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
