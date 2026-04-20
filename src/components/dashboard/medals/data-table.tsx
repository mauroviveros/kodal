import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/shadcn/table";
import type { DataTableProps } from "@/interfaces";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const { getHeaderGroups, getRowModel } = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="overflow-auto rounded-md border">
      <Table>
        <TableHeader>
          {getHeaderGroups().map(({ id, headers }) => (
            <TableRow key={id}>
              {headers.map(({ id, column, isPlaceholder, getContext }) => (
                <TableHead key={id}>
                  {isPlaceholder ? null : flexRender(column.columnDef.header, getContext())}
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
