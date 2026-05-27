import { Button } from "@/components/shadcn/button";
import { ButtonGroup } from "@/components/shadcn/button-group";
import { MEDAL_STATUS_LABELS } from "@/constants";
import type { Tables } from "@/interfaces";

const STATUS_FILTERS = ["ACTIVE", "MANUFACTURED", "CREATED"] as const

export default function MedalsTableFilter(
  {
    filters,
    handleChangeFilterStatus,
  }:
  {
    filters: {
      status: Tables<'medals'>['status'] | null
    },
    handleChangeFilterStatus: (status: Tables<'medals'>['status'] | null) => void,
  }
){
  return (
    <div className="flex justify-end gap-4">
      <ButtonGroup>
        <Button
          variant={filters.status === null ? "default" : "outline"}
          onClick={() => handleChangeFilterStatus(null)}
          size="sm"
        >
          Todas
        </Button>
        {STATUS_FILTERS.map((status) => (
          <Button
            key={status}
            variant={filters.status === status ? "default" : "outline"}
            size="sm"
            onClick={() => handleChangeFilterStatus(status)}
          >
            {MEDAL_STATUS_LABELS[status].label}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  )
}
