"use client"

import { useSwitchNetwork } from "wagmi"

export default function ProfileBalance({ loading, balance, token, active}: { loading: boolean, balance: string, token: any, active: boolean }) {
  const { switchNetwork } =
  useSwitchNetwork()

    return (
      <div className={`flex flex-row items-center gap-4 p-4 rounded-lg outline ${active && 'outline-green-300'} ${!active && 'hover:bg-green-300/50 cursor-pointer'}`} 
      onClick={() => {if(!active){ switchNetwork?.(token.id)}}}>
        <div className="flex flex-col">
          <span className="text-sm tracking-wider text-green-300 font-bold uppercase">{token.name}</span>
          <span className={`text-gray-300 font-bold `}>{loading ? "loading" : balance}</span>
        </div>
      </div>
  
    )
  }