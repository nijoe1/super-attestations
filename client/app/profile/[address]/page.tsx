"use client";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import ProfitContributions from "./ProfitContributions";
import TransactionsList from "./TransactionList";
import UserDetails from "./UserDetails";

export default function ProfilePage({
  params,
}: {
  params: { address: string };
}) {
  
  const {address} = useAccount();

  const [transactions, setTransactions] = useState<any[]>([]);

  
  
  useEffect(() => {
    //get by chain.id
  
    //get all the transaction multichain. 
    async function getAttestationByAddress(recipient:string, clientId = 420) {
      const api = process.env.NEXT_PUBLIC_API || "http://localhost:4000";
      const response = await fetch(`${api}/library/attestation-by-address/${recipient}?clientId=${clientId}`);
      const result = await response.json();
      console.log(result);

      setTransactions(result);
    }
    
    if(params.address){
      getAttestationByAddress(params.address);
    }
    
    
  }, [params.address])

  return (
    <main className="m-3">
      <div className="grid sm:grid-cols-7 mx-auto gap-4 p-4 items-start">
        <div className="col-span-2 p-4 rounded-md">
          <UserDetails
            username="JohnDoe"
            address={params.address}
            totalTokens={100}
          />
        </div>
        <main className="col-span-5">
          <ProfitContributions
            profit={500}
            totalContributions={20}
            approvedContributions={15}
            profitGrowth={7}
            user={false}
          />
          <div className="grid grid-cols-2 gap-8 m-12">
            <TransactionsList
              transactions={transactions}
            />

          </div>
        </main>
      </div>
    </main>
  );
}
