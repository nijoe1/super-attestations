"use client"

import { Badge } from "@/components/ui/badge"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Attestion = {
  id: string
  name: string
  tags: string
  cid: string
  status: "attested" | "revoked" | "finished"
  email: string
}

export const voteColumn: ColumnDef<Attestion>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "attester",
    header: "attester",
  },
  {
    accessorKey: "cid",
    header: "Cid",
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) => {
      const tags = row.getValue("tags") as string;
      const tagArray = tags.split(",") as [];

      return tagArray.map((tag, i) => <Badge key={i} className="mx-1">{tag}</Badge>);

    }
  },
]
