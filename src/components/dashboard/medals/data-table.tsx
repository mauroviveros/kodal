import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shadcn/table";
import type { DataTableProps } from "@/interfaces";
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable, type SortingState } from "@tanstack/react-table";
import { useState } from "react";

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([{ id: "pet_created_at", desc: true }])
  const { getHeaderGroups, getRowModel } = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {getHeaderGroups().map(({ id, headers }) => (
            <TableRow key={id}>
              {headers.map(({ id, column, isPlaceholder, getContext }) => (
                <TableHead
                  key={id}
                  onClick={column.getToggleSortingHandler()}
                  className={column.getCanSort() ? "cursor-pointer select-none" : ""}
                >
                  <div className="w-full inline-flex justify-center gap-1">
                    {isPlaceholder ? null : flexRender(column.columnDef.header, getContext())}
                    {{ asc: " ↑", desc: " ↓" }[column.getIsSorted() as string] ?? null}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {getRowModel().rows.length ? (
            getRowModel().rows.map(({ id, getIsSelected, getVisibleCells }) => (
              <TableRow key={id} data-state={getIsSelected() && "selected"}>
                {getVisibleCells().map(({ id, column, getContext }) => (
                  <TableCell key={id}>
                    {flexRender(column.columnDef.cell, getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No se encontraron datos.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
