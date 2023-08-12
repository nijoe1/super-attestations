"use client"

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { DataTablePagination } from "@/components/ui/data-table-pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEthersSigner } from "@/lib/ethers"
import { EAS } from "@ethereum-attestation-service/eas-sdk"
import { useState } from "react"
import { toast } from "react-toastify"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function ResolveTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState({})
  const signer = useEthersSigner();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    }

  })
  
  const revokeCid = async() => {
    console.log("testing if this display anything")
    console.log(table)
    
    const resolveId = table.getFilteredSelectedRowModel().rows.map((row) => {
      //@ts-ignore
      return row.original.id;
    });
    
    const schema = table.getFilteredSelectedRowModel().rows.map((row) => {
      //@ts-ignore
      return row.original.schemaId;
    });
    
    const EASoGoerli = "0x4200000000000000000000000000000000000021";
    const eas = new EAS(EASoGoerli);

    //const signer = walletClientToSigner(walletCline);

      //@ts-ignore
      eas.connect(signer);

      
      toast.promise(eas.revoke({
        schema: schema[0], 
        data: {
          uid: resolveId[0]
        }
      }), 
      {
        pending: "Revoking CID",
        success: "You succesfully revoked the attstation.",
        error: "Error while revoking attestation."
        })

    
    ///now we integrate eas. 
    
  }


  return (
    <div>
      
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    <div className="flex items-center justify-end space-x-2 py-4">
      <DataTablePagination table={table} />
    </div>
    <div className="text-right">
      {table.getFilteredSelectedRowModel().rows.length  > 0 && <Button onClick={revokeCid}>Revoke ({table.getFilteredSelectedRowModel().rows.length}) issues</Button>}
    </div>
    </div>
  )
}
