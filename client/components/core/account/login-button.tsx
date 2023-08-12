"use client"
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useAccount, useBalance, useConnect, useNetwork } from 'wagmi';
import ProfileDetails from './profile-details';



export default function LoginButton() {
  const { connect, connectors } = useConnect();
  const { address, status, isConnected, isConnecting, isReconnecting, isDisconnected } = useAccount();
  const { chain, chains } = useNetwork()
  const [showModal, setShowModal] = useState(false);
  const {data:balance} = useBalance({address:address})

  // Eager connection
  useEffect(() => {
    if (!isDisconnected) return;
    const wagmiConnected = localStorage.getItem('wagmi.connected');
    const isWagmiConnected = wagmiConnected ? JSON.parse(wagmiConnected) : false;

    if (!isWagmiConnected) return;

    connect({ connector: connectors as any });
  }, [connect, connectors, isDisconnected]);
  
  function truncateTextMiddle(text:string, maxLength:number) {
    if (text.length <= maxLength) {
      return text;
    }
  
    const halfLength = Math.floor((maxLength - 3) / 2); // Subtracting 3 to accommodate for the ellipsis
  
    const start = text.slice(0, halfLength);
    const end = text.slice(-halfLength);
  
    const truncatedText = start + '...' + end;
    return truncatedText;
  }
  



  if (isConnecting) {
    return (
      <div className="text-md text-white bg-gray-800 rounded-full py-1 px-8" >
        Loading
      </div>
    )
  }

  if (!isConnecting && address) {
    return (
      <div className="flex rounded-md  items-center gap-2">
        <button className=' bg-gray-800 py-1 px-4 outline rounded-md outline-gray-900 text-md overflow truncate tracking-wider hover:outline-indigo-500' onClick={() => setShowModal(!showModal)}>
          {truncateTextMiddle(address, 13)}
          {showModal && <ProfileDetails address={address} showModal={showModal} setShowModal={setShowModal} />}
        </button>
        {chain?.id != 420 && chain?.id != 84531 && chain?.id != 5 && (
          <Button className="bg-red-600"  onClick={() => setShowModal(!showModal)}>
            Unsupported Chain
          </Button>
        )}
      
            
        
        
        </div>
        

    )
  }

  if (!isReconnecting && !isConnected && !isConnecting && !address) {

    return (
      <div className="flex gap-4 items-center">
        <div className='flex gap-4'>
          {!isReconnecting && !isConnected && (

            connectors.map((connector) =>
            (
              <button className="bg-gray-800 text-md text-gray-3for00 rounded-md text-md py-1 px-4" key={connector.id} onClick={() => connect({ connector })}>
                {connector.name}
              </button>
            )
            ))}
        </div>
      </div>

    );
  }

  return (
    <div className="text-md text-white bg-cf-500 rounded-full py-1 px-8" >
      Loading
    </div>
  )

}
