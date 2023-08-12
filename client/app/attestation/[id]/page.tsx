"use client";
import AccessType from "@/components/core/attestation/access-type";
import SchemaList from "@/components/core/attestation/schema/schema-list";
import Loading from "@/components/core/loading/loading";
import { Button } from "@/components/ui/button";
import { CONTRACTS } from "@/constants/contracts";
import { ReloadIcon } from "@radix-ui/react-icons";
import { readContract } from "@wagmi/core";
import { parseEther } from 'viem';
import { Badge } from "@/components/ui/badge";
import { secondsToDaysAndHours } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useAccount, useContractWrite } from "wagmi";
import AttestionDetails from "./attestion-details";
export default function AttestationPage({
  params,
}: {
  params: { id: string };
}) {
  const [data, setData] = useState<any>({});
  const [details, setDetails] = useState<any>({
    mintPrice: "0",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [hasAccess, setHasAccess] = useState<any>({
    revoke: false,
    attest: false,
    fileAccess: false,
  });
  const { address } = useAccount();
  const { isLoading: minting, write: mint } = useContractWrite({
    address: CONTRACTS.attestionFactory[420].contract,
    abi: CONTRACTS.attestionFactory[420].abi,
    functionName: "mint",
    args: [params.id,1],
    value: data?.mintPrice
  });
  const {
    isLoading: resolveLoading,
    write: resolve,
  } = useContractWrite({
    address: CONTRACTS.attestation[420].contract,
    abi: CONTRACTS.attestation[420].abi,
    functionName: "resolveAttestations",
  });
  const {
    isLoading: splitLoading,
    write: splitFunds,
  } = useContractWrite({
    address: CONTRACTS.attestation[420].contract,
    abi: CONTRACTS.attestation[420].abi,
    functionName: "splitMintingFunds",
  });

  useEffect(() => {

    //get by chain.id 
    async function getSchemaById(schemaUID:string, clientId = 420) {
      const api = process.env.NEXT_PUBLIC_API || "http://localhost:4000";

      const response = await fetch(`${api}/library/schema/${schemaUID}?clientId=${clientId}`);
      const result = await response.json();
      console.log(result);
      setData(result);
      setLoading(false)
      
    }
    
    //get data from own GRAPH.

    const getAccess = async (schemaUID: string) => {
      const fileAccess = (await readContract({
        address: CONTRACTS.attestionFactory[420].contract,
        abi: CONTRACTS.attestionFactory[420].abi,
        functionName: "hasAccess",
        args: [schemaUID, address],
      })) as boolean;

      const revokeAccess = (await readContract({
        address: CONTRACTS.attestionFactory[420].contract,
        abi: CONTRACTS.attestionFactory[420].abi,
        functionName: "hasRevokeAccess",
        args: [schemaUID, address],
      })) as boolean;

      const attestAccess = (await readContract({
        address: CONTRACTS.attestionFactory[420].contract,
        abi: CONTRACTS.attestionFactory[420].abi,
        functionName: "hasAttestAccess",
        args: [schemaUID, address],
      })) as boolean;

      setHasAccess({
        revoke: revokeAccess,
        attest: attestAccess,
        fileAccess: fileAccess,
      });

      console.log(revokeAccess, attestAccess, fileAccess);
    };

    if ((params.id, address)) {
      setLoading(true);
      getSchemaById(params.id);
      getAccess(params.id)
    }
  }, [params, address]);

  if (loading) return <Loading />;
  return (
    <main className="flex flex-col items-center text-left gap-8 m-12">
      <div className="max-w-4xl flex flex-col gap-4 items-center text-gray-300">
        <div className="flex md:flex-row flex-col justify-between w-full gap-8">
          <div className="flex flex-col gap-4"> 
            <h1 className="text-left text-2xl tracking-wider font-light text-green-300">
              {data.name}
            </h1>
            <span className="text-sm text-left">{data.description}</span>
            <div className="flex gap-2">
                {data.tags?.map((tag: string, index:number) => (
                  <Badge key={index}  color="var(--color-green-300)">
                    {tag}
                  </Badge>
                  ))}
            </div>
            <span className="text-gray-400 m-4">Resolution time: {secondsToDaysAndHours(data.attestResolutionDays)}</span>
            <h3 className="font-medium tracking-wider text-green-300">
            Schema Attributes
          </h3>

          <SchemaList list={data.schema} />
          </div>

          <div className="flex flex-col gap-4">
            {hasAccess.fileAccess ? (
                !data.isMintable ? (
               <Button
               onClick={() => {
                 resolve();
               }}
               disabled={resolveLoading}
             >
               {resolveLoading ? (
                 <>
                   <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />{" "}
                   Resolving...
                 </>
               ) : (
                 "Resolve Attestations"
               )}
             </Button>
                ): (
             <Button
               onClick={() => {
                 splitFunds();
               }}
               disabled={splitLoading}
             >
               {splitLoading ? (
                 <>
                   <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />{" "}
                   Splitting...
                 </>
               ) : (
                 "Splitting Funds"
               )}
             </Button>
            )) : data.isMintable ? (
              <Button onClick={() => mint()} disabled={minting}>
                {minting ? (
                  <>
                    <ReloadIcon /> Minting..
                  </>
                ) : (
                  "Subscribe to get access "
                )}
                price : {(data.mintPrice/1000000000000/1000000)} ETH
              </Button>
            ) : (
              <Button disabled>Private DataPool</Button>
            )}
           
            <AccessType type="Revoke" access={hasAccess.revoke} />
            <AccessType type="Attest" access={hasAccess.attest} />
            <AccessType type="View" access={hasAccess.fileAccess} />
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full text-left mt-4">
          
        </div>
      </div>

      <AttestionDetails
        attestations={data._count?.attestations}
        id={data.id}
        resolutionDays={data.attestResolutionDays}
        schema={data.schema}
        hasAccess={hasAccess}
        details={data}
      />
    </main>
  );
}
