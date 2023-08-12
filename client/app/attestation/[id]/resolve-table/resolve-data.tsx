"use client";
import Loading from "@/components/core/loading/loading";
import { useState } from "react";
import { Attestion, resolveColumns } from "./resolve-columns";
import { ResolveTable } from "./resolve-table";


export default function ResolveData({id, attestations}: {id: string, attestations: any[]}) {
  const [data, setData] = useState<Attestion[]>([]);
  const [loading, setLoading] = useState(false);


  return (
    <div className="container mx-auto py-10">
      {loading ? <Loading /> : <ResolveTable columns={resolveColumns} data={attestations} />
}
    </div>
  );
}
