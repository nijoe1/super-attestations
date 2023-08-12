"use client"
import { Button } from '@/components/ui/button'
import { CONTRACTS } from '@/constants/contracts'
import { decode } from '@/lib/wld'
import { IDKitWidget, ISuccessResult } from '@worldcoin/idkit'
import { useEffect, useState } from 'react'
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite ,useNetwork} from 'wagmi'

export default function Worldcoin() {
	const { chain, chains } = useNetwork()

	const { address } = useAccount()
	const [claimed, setClaimed] = useState(false)
	const [fees, setFees] = useState(BigInt(0))

	const [proof, setProof] = useState<ISuccessResult | null>(null)
	const {data: isClaimed, isLoading} = useContractRead({
		address: CONTRACTS.worldcoin[420].contract,
		abi: CONTRACTS.worldcoin[420].abi,
		functionName: 'balanceOf',
		args: [address],
	});

	const {data: isClaimedBase, isLoading: isLoadingBase} = useContractRead({
		address: CONTRACTS.worldcoin[84531].contract,
		abi: CONTRACTS.worldcoin[84531].abi,
		functionName: 'balanceOf',
		args: [address],
	});
	

	const {data: readFeesBase, isLoading: readFeesBaseLoading} = useContractRead({
		address: CONTRACTS.worldcoin[420].contract,
		abi: CONTRACTS.worldcoin[420].abi,
		functionName: 'estimateFees',
		args: [address],
	})

	useEffect(() => {
		if(chain?.id == 420){
			if(isClaimed == 0){
				setClaimed(false)
			}else{
				setClaimed(true)
				
			}
			// @ts-ignore
			setFees(readFeesBase)
			console.log(readFeesBase)

		}else if(chain?.id == 84531){
			if(isClaimedBase == 0){
				setClaimed(false)
			}else{
				setClaimed(true)
				
			}
		}else{
			setClaimed(false)
		}

	}, [isClaimed,isClaimedBase,readFeesBase])
	
	const { config } = usePrepareContractWrite({
		address: CONTRACTS.worldcoin[420].contract,
		abi: CONTRACTS.worldcoin[420].abi,
		enabled: proof != null && address != null,
		functionName: 'MintHumanBadge',
		value: fees,
		args: [
			address!,
			proof?.merkle_root ? decode<BigInt>('uint256', proof?.merkle_root ?? '') : BigInt(0),
			proof?.nullifier_hash ? decode<BigInt>('uint256', proof?.nullifier_hash ?? '') : BigInt(0),
			proof?.proof
				? decode<[BigInt, BigInt, BigInt, BigInt, BigInt, BigInt, BigInt, BigInt]>(
						'uint256[8]',
						proof?.proof ?? ''
				  )
				: [
						BigInt(0),
						BigInt(0),
						BigInt(0),
						BigInt(0),
						BigInt(0),
						BigInt(0),
						BigInt(0),
						BigInt(0),
				  ],
		],
	})
	const { write } = useContractWrite(config)

	if(isLoading) return <div>Loading...</div>
	return (
		<main>
			{address ? (chain?.id == 84531 && !claimed? (<Button onClick={write}
                        className="hover:bg-purple-700"
                    >Change to OptimismGoerli</Button>) :
				!claimed ? (
				proof ? (
					<Button onClick={write}
                        className="hover:bg-purple-700"
                    >Claim Token</Button>
				) : (
					<IDKitWidget
						app_id="app_staging_a47d8b8169a3e3e80953e86f1093d30d" // must be an app set to on-chain
						action="human-verification"
						signal={address}
						onSuccess={setProof}
						enableTelemetry
					>
						{({ open }) => <Button onClick={open} >Verify</Button>}
					</IDKitWidget>
				)
			):(
				<div className="bg-green-500 p-4 rounded-md text-black text-sm">Worldcoin verified!</div>
			)) : null}
		</main>
	)
}
