//here we will generate the api key and jwt token, so we can use it directly. we need to store them in such a way that we can access them from the frontend
// and pass them on to the backend for encryption. 
import { getJWT } from '@lighthouse-web3/kavach';
import lighthouse from '@lighthouse-web3/sdk';

import { getAccount, signMessage } from '@wagmi/core';
import axios from 'axios';
import { Address } from "wagmi";
//API key generation 
async function signAuthMessage() {

    const account:any = await getAccount()    
    const messageRequested = (await lighthouse.getAuthMessage(account.address)).data.message;
    const signedMessage = await signMessage({message: messageRequested});
    return {signedMessage, address: account.address};
}


export async function generateApiKey() {
    const {signedMessage, address} = await signAuthMessage();
    const verificationMessage = (
        await axios.get(
            `https://api.lighthouse.storage/api/auth/get_message?publicKey=${address}`
        )
      ).data
      
      console.log(verificationMessage)
      
    const signedVerificationMessage = await signMessage({message: verificationMessage});
    
    const response = await lighthouse.getApiKey(address, signedVerificationMessage);
    if (response.data.apiKey) {
        localStorage.setItem(`lighthouse-api-key-${address}`, response.data.apiKey);
        return response.data.apiKey;
    }
    console.log(response);
    return response;
}

export async function generateJWT() {
    const {signedMessage, address} = await signAuthMessage();
    const response = await getJWT(address, signedMessage);
    if (response.JWT) {
        localStorage.setItem(`lighthouse-jwt-${address}`, response.JWT);
        return response;
    }
    
    if(response.error){
        throw Error('JWT generation failed:');
    }
}

export async function getLighthouseKeys(address: Address) {
    //first check if there is an jwt token
    if (!localStorage.getItem(`lighthouse-jwt-${address}`)) {
        await generateJWT();
    }
    
    if(!localStorage.getItem(`lighthouse-api-key-${address}`)){
        await generateApiKey();
    }
    
    
    
    return {JWT: localStorage.getItem(`lighthouse-jwt-${address}`), apiKey: localStorage.getItem(`lighthouse-api-key-${address}`)};
    
}