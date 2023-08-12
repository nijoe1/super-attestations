"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { useEffect, useState } from "react"
import { fetchBlockNumber } from '@wagmi/core'
import { usePublicClient } from 'wagmi'

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Attestion = {
  id: string
  name: string
  tags: string
  cid: string
  status: "attested" | "revoked" | "finished"
  time: number
}

export const resolveColumns: ColumnDef<Attestion>[] = [
  {
    accessorKey: "attester",
    header: "attester",
    cell: ({ row }) => {
      const attester = row.getValue("attester") as any;
 
      return <Link className="text-right font-medium text-green-300 hover:text-green-500" href={`/profile/${attester}`}>View Attester</Link>
    },
  },
  {
    accessorKey: "decodedDataJson",
    header: "name",
    cell: ({ row }) => {
      const data = row.getValue("decodedDataJson") as any;
 
      return <div className="text-right font-medium">{data.name}</div>
    },
  },
  {
    accessorKey: "decodedDataJson",
    header: "file",
    cell: ({ row }) => {
      const data = row.getValue("decodedDataJson") as any
 
      return <div className="text-right font-medium">{data.file}</div>
    },
  },
  {
    accessorKey: "decodedDataJson",
    header: "description",
    cell: ({ row }) => {
      const data = row.getValue("decodedDataJson") as any;
 
      return <div className="text-right font-medium">{data.description}</div>
    },
  },
  {
    accessorKey: "timeCreated",
    header: "timeCreated",
    cell: ({ row }) => <CountdownCell futureTimestamp={parseFloat(row.getValue("timeCreated"))} />
  },
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
]

const CountdownCell = ({ futureTimestamp }:{futureTimestamp:number}) => {
  const [secondsLeft, setSecondsLeft] = useState(futureTimestamp - Math.floor(Date.now() / 1000));

  useEffect(() => {
      const interval = setInterval(() => {
          let currentTimestamp = Math.floor(Date.now() / 1000);
          setSecondsLeft(futureTimestamp + 3600 - currentTimestamp);
      }, 1000);

      return () => clearInterval(interval); // Clean up on component unmount
  }, [futureTimestamp]);

  return <div className="text-right font-medium">{secondsLeft}</div>;
}
