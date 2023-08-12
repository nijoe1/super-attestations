import { decodeAbiParameters } from 'viem'

export const decode = <T>(type: string, encodedString: any): T => {
	return decodeAbiParameters([{type}], encodedString)[0] as T
	
}