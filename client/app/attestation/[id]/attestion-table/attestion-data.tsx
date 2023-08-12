"use client";
import Loading from "@/components/core/loading/loading";
import { useState } from "react";
import { Attestion, AttestionColumns } from "./columns";
import { AttestionDataTable } from "./data-table";


export default function AttestionData({id, attestations}: {id: string, attestations: any[]}) {
  const [data, setData] = useState<Attestion[]>([]);
  const [loading, setLoading] = useState(false);

  console.log(attestations)
  return (
    <div className="container mx-auto py-10">
      {loading ? <Loading /> :       <AttestionDataTable columns={AttestionColumns} data={attestations} />
}
    </div>
  );
}
