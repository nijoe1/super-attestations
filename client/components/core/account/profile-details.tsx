

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { formatEther } from 'viem';
import { useAccount, useDisconnect, useNetwork } from 'wagmi';

import { Address, createPublicClient, http } from 'viem';


import { CopyIcon, Download, LogOutIcon, PlusIcon, RecycleIcon, SettingsIcon, Wallet2Icon } from 'lucide-react';
import ModalLayout from './modal-layout';
import ProfileBalance from './profile-balance';



export default function ProfileDetails({ showModal, open, setShowModal }: any) {

    const { disconnect } = useDisconnect();
    const [loading, setLoading] = useState(true);
    //get all the chains configered from wagmi
    const { chain, chains } = useNetwork()
    const [balances, setBalances] = useState<any>([]);


    const { address: account, isConnected } =
        useAccount();


    useEffect(() => {
        async function getBalances() {
            
            console.log(chain)
            for(let i=0; i<chains.length; i++){
                const client = createPublicClient({
                    chain: chains[i],
                    transport: http(chains[i].rpcUrls.default.http[0])
                });
    
                let getBalance:any = await client.getBalance({
                    address:account as Address
                })
                
                getBalance = formatEther(getBalance)

    
                if(i == 0){
                    setBalances([{chain: chains[i], balance: getBalance, active: chain?.id == chains[i].id}])
                }else {
                    setBalances((prev: any) => [...prev, {chain: chains[i], balance: getBalance, active: chain?.id == chains[i].id}])
                }
            }

        
        
        }
    
        if(account && chains){
            getBalances();
            setLoading(false)
        }
        

}, [account, chains,chain]);




    



async function copyAddress() {
    navigator.clipboard.writeText(account as Address)
    toast.success("Copied to clipboard")
}

return (
    <ModalLayout title="" showModal={showModal}>
        {isConnected ? (

            <div className='flex flex-col divide-solid'>
                <div id="username" className='text-lg'>
                    <h1>Portfolio</h1>
                    <span
                        className="text-lg font-bold ml-4"
                    >
                        $ 0.00
                    </span>
                    <div className='grid grid-cols-4 gap-2 my-4 text-gray-900'>
                        <div className='rounded-md bg-green-200 flex justify-center py-4 hover:shadow-sm hover:bg-green-400'>
                            <PlusIcon />
                        </div>
                        <div className='rounded-md bg-green-200 flex justify-center py-4 hover:bg-green-400'>
                            <Download />
                        </div>
                        <div className='rounded-md bg-green-200 flex justify-center py-4 hover:bg-green-400'>
                            <RecycleIcon />
                        </div>
                        <div className='rounded-md bg-green-200 flex justify-center py-4 hover:bg-green-400'>
                            <Wallet2Icon />
                        </div>
                        
                    </div>
                </div>
                <div id="balances" className='grid grid-cols-1 py-4 gap-4'>
                    {balances.map((balance: any, key: number) => (

                             <ProfileBalance key={key} loading={loading} token={balance.chain} balance={balance.balance} active={balance.active} />

                   
                    ))}

                </div>
                <div className="grid grid-cols-3 p-4 gap-2">
                     <button className='font-bold flex justify-center  px-3 rounded-md py-4 text-center hover:bg-gray-400'
                        onClick={() => copyAddress()}
                    >
                        <CopyIcon />
                    </button>
                    <Link
                        href="/profile/settings"
                        className=' font-bold flex justify-center  px-3 rounded-md py-4 text-center hover:bg-gray-400'
                    >
                        <SettingsIcon />
                    </Link>
                    <button
                        className='text-red-500 flex justify-center  py-4 font-bold hover:bg-red-200   px-3 rounded-md'
                        onClick={() => { disconnect(); setShowModal(false) }}
                    >
                        <LogOutIcon />
                    </button>



                </div>
            </div>


        ) : (
            <p>Not connected</p>
        )}
    </ModalLayout>
)
}