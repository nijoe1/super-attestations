"use client"


import LoginButton from "@/components/core/account/login-button"
import { CONTRACTS } from "@/constants/contracts"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { ActivityGraph } from "./profile/[address]/ActivityGraph"
import ProfitContributions from "./profile/[address]/ProfitContributions"
import TransactionsList from "./profile/[address]/TransactionList"
import UserDetails from "./profile/[address]/UserDetails"

export default function Home() {
  const {address} = useAccount()
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    async function getAttestationByAddress(recipient:string, clientId = 420) {
      const api = process.env.NEXT_PUBLIC_API || "http://localhost:4000";
      const response = await fetch(`${api}/library/attestation-by-address/${recipient}?clientId=${clientId}`);
      const result = await response.json();
      console.log(result);

      setTransactions(result);
    }
    
    if(address){
      getAttestationByAddress(address);
    }
  }, [address])
  
  
  return (
    <main className="flex min-h-screen  flex-col items-center justify-between p-24">
        {address ? (
            <div className="grid sm:grid-cols-7 mx-auto gap-4 p-4 items-start">
            <div className="col-span-2 p-4 rounded-md">
              <UserDetails
                username="JohnDoe"
                address={address}
                totalTokens={transactions.length}
              />
            </div>
            <main className="col-span-5">
              <ProfitContributions
                profit={500}
                totalContributions={transactions.length}
                approvedContributions={15}
                profitGrowth={7}
                user={true}
              />
              <div className="grid grid-cols-1 gap-8 m-12">
                <TransactionsList
                  transactions={transactions}
                />
                <ActivityGraph />
              </div>
            </main>
          </div>
        ): (
          <div className="flex flex-col items-center justify-center">
            <LoginButton />
          </div>
        )}
    </main>
  )
}


function DisplayLinks () {
  return (
    <div>
      {Object.entries(CONTRACTS).map(([contractName, networks]) => (
        <div key={contractName} className="flex flex-col gap-2">
          <h2 className="mt-4 text-2xl ">{contractName}</h2>
          {Object.entries(networks).map(([networkId, details]) => (
            <div key={networkId}>
              {networkId === "420" ? (
                <Link href={`https://goerli-optimism.etherscan.io/address/${details.contract}`} target="_blank" className="text-red-300">
                  {details.contract}
                </Link>
              ) : (
                <Link href={` https://basescan.org/address/${details.contract}`} target="_blank" className="text-blue-300">
                  {details.contract}
                </Link>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};