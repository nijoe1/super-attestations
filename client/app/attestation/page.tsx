"use client"
import Loading from "@/components/core/loading/loading";
import { useEffect, useState } from "react";
import { useNetwork } from "wagmi";
import AttestionItem from "./attestion-item";



export default  function Attestions() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([])
  const {chain} = useNetwork()
  useEffect(() => {
    setLoading(true)
    async function getAllSchema(chainId:number) {
      const api = process.env.NEXT_PUBLIC_API || "http://localhost:4000";

      const response = await fetch(`${api}/library/all-schema?chainId=${chainId}`);
      const result = await response.json();
      console.log(result)
      setData(result) 

    }
    
    if(chain){
      if(chain.id > 0){
        getAllSchema(chain.id);
      }
      getAllSchema(420);
    }
    setLoading(false)
  }, [chain])
  


  if(loading) return <Loading />

  return (
    <main className="m-12">
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-8 items-start justify-center">
        {data?.map((item, index) => (
          <AttestionItem key={index} schema={item} />
        ))}
      </div>
    </main>
  );
}
