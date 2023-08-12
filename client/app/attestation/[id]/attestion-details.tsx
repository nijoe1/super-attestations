"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SchemaForm from "@/components/core/attestation/schema/schema-form";
import Loading from "@/components/core/loading/loading";
import { useEffect, useState } from "react";
import AttestionData from "./attestion-table/attestion-data";
import ResolveData from "./resolve-table/resolve-data";

export type Attestion = {
  attester: string;
  data:string
  decodedDataJson:string;
  expirationTime:string;
  ipfsHash:string;
  id:string;
  isOffchain:boolean;
  recipient:string;
  refUID:string;
  revocable:true
  revocationTime:number;
  revoked:string;
  schemaId:string;
  time:number;
  timeCreated:number;
  txid:string;
  status:string;
};

export default function AttestionDetails({
  attestations,
  id,
  schema,
  hasAccess,
  resolutionDays,
  details
}: {
  attestations: any;
  id: string;
  schema: string;
  hasAccess: any;
  resolutionDays: number;
  details:any;
}) {


  const [data, setData] = useState<Attestion[]>([]);
  const [listAttest, setListAttest] = useState<Attestion[]>([]);
  const [listResolve, setListResolve] = useState<Attestion[]>([]);
  const [listRevoke, setListRevoke] = useState<Attestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async (schemaUID:string, clientId = 420) => {
      
        const api = process.env.NEXT_PUBLIC_API || "http://localhost:4000";
        const response = await fetch(`${api}/library/attestation/${schemaUID}?clientId=${clientId}`);
        const result = await response.json();
        console.log(result);
        
        //filter attestions based on status and set to state
        const resolve = result.filter((item:Attestion) => item.status == "Active");
        const revoke = result.filter((item:Attestion) => item.status == "Revoke");
        const attest = result.filter((item:Attestion) => item.status == "Expired");
        
        
        setData(result);
        setListResolve(resolve);
        setListRevoke(revoke);
        setListAttest(attest);
        setLoading(false)
        return  result

    };

    if (id) {
      getData(id);
    }
  }, [attestations, id, resolutionDays]);

  if(loading) return <Loading />;
  return (
    <Tabs defaultValue="attest" className="w-full flex flex-col items-center">
      <TabsList className="grid max-w-2xl grid-cols-3 mb-4">
        <TabsTrigger value="attest" disabled={!hasAccess.attest}>Attest</TabsTrigger>
        <TabsTrigger value="view" disabled={!hasAccess.fileAccess}>View Attestations</TabsTrigger>
        <TabsTrigger value="revoke" disabled={!hasAccess.revoke}>Revoke</TabsTrigger>
      </TabsList>
      <TabsContent value="attest" className="min-w-[300px]">
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-300 tracking-wider font-light">
              Create Attestation
            </CardTitle>
            <CardDescription className="text-green-300">
              Reward {details.attestReward} ETH
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <SchemaForm schema={schema} schemaUID={id} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="view" className="w-full">
        {hasAccess.fileAccess ? <AttestionData id={id} attestations={listAttest}/> : <div> No access </div>}
      </TabsContent>
      <TabsContent value="revoke" className="w-full">
        {hasAccess.revoke ? (
          <div>
            <ResolveData id={id} attestations={listResolve} />
         
          </div>
        ) : (
          <span>No access </span>
        )}
      </TabsContent>
    </Tabs>
  );
}
