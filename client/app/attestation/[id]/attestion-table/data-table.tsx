"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
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
import { getLighthouseKeys } from "@/lib/lighthouse"
import axios from "axios"
import { useState } from "react"
import { toast } from "react-toastify"
import { useAccount } from "wagmi"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function AttestionDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState({})
  const {address} = useAccount();

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
  
  const downloadFiles = async () => {
    
    if(!address) return toast.error("Please connect your wallet");
    const { JWT } = await getLighthouseKeys(address);
    if (!JWT) return;
  
    const config = {
      headers: {
        Authorization: `${JWT}`,
        "Content-Type": "application/json",
      }

    };
  
    const files = table.getFilteredSelectedRowModel().rows.map((row) => {
      //@ts-ignore
      return row.original.decodedDataJson.file;
    });
    
    console.log(files)
    
    const data = {  
      cids: files,
      address: address,
    }
  
    try {
      const url = process.env.NEXT_PUBLIC_API || "http://localhost:4000";
      const response = await axios.post(
        `${url}/files/downloadMap`,
        data,
        config
      );
  
      const blob = new Blob([response.data], { type: 'application/zip' });
  
      const downloadURL = window.URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = "files.zip";
      document.body.appendChild(link);
      link.click();
  
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadURL);
  
    } catch (err) {
      toast.error("Something went wrong when downloading the files");
      throw err;
    }
  };


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
      {table.getFilteredSelectedRowModel().rows.length  > 0 && <Button onClick={downloadFiles}>Download ({table.getFilteredSelectedRowModel().rows.length}) files</Button>}
    </div>
    </div>
  )
}
