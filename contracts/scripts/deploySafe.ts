import SafeApiKit from "@safe-global/api-kit";
import { ethers } from "ethers";
import { SafeAccountConfig, EthersAdapter,ContractNetworksConfig } from "@safe-global/protocol-kit";
import { SafeTransactionDataPartial } from "@safe-global/safe-core-sdk-types";

import Safe, { SafeFactory } from "@safe-global/protocol-kit";

async function main() {
  const config = {
    RPC_URL:
      "https://opt-goerli.g.alchemy.com/v2/Qs0oArxRd6ljm5ELdIzJ1qHhbvbjndSu",
    DEPLOYER_ADDRESS_PRIVATE_KEY: "",
    DEPLOY_SAFE: {
      OWNERS: ["0x9C5e3cAC8166eD93F76BC0469b8Bf3ca715bA6B7"],
      THRESHOLD: 1, // <SAFE_THRESHOLD>
      SALT_NONCE: Math.floor(Math.random() * 9999).toString(),
    },
  };

    const contractNetworks: ContractNetworksConfig = {
    [420]: {
      safeMasterCopyAddress: "0xfb1bffC9d739B8D520DaF37dF666da4C687191EA",
      safeProxyFactoryAddress: "0xC22834581EbC8527d974F8a1c97E1bEA4EF910BC",
      multiSendAddress: "0x998739BFdAAdde7C933B942a68053933098f9EDa",
      multiSendCallOnlyAddress: "0xA1dabEF33b3B82c7814B6D82A79e50F4AC44102B",
      fallbackHandlerAddress: "0x017062a1dE2FE6b99BE3d9d37841FeD19F573804",
      signMessageLibAddress: "0x98FFBBF51bb33A056B08ddf711f289936AafF717",
      createCallAddress: "0xB19D6FFc2182150F8Eb585b79D4ABcd7C5640A9d",
      simulateTxAccessorAddress: "0x727a77a074D1E6c4530e814F89E618a3298FC044",
    },
  };

  const safeAccountConfig: SafeAccountConfig = {
    owners: config.DEPLOY_SAFE.OWNERS,
    threshold: config.DEPLOY_SAFE.THRESHOLD,
  };
  const saltNonce = config.DEPLOY_SAFE.SALT_NONCE;
  const provider = new ethers.providers.JsonRpcProvider(config.RPC_URL);
  const deployerSigner = new ethers.Wallet(
    config.DEPLOYER_ADDRESS_PRIVATE_KEY,
    provider
  );

  // Create EthAdapter instance
  const ethAdapter = new EthersAdapter({
    ethers,
    signerOrProvider: deployerSigner,
  });
  const txServiceUrl = "https://safe-transaction-mainnet.safe.global";
  const safeService = new SafeApiKit({ txServiceUrl, ethAdapter });

  const safeFactory = await SafeFactory.create({ ethAdapter });

  // const safeSdk: Safe = await safeFactory.deploySafe({ safeAccountConfig });

  // //   Deploy Safe
  // const safe = await safeFactory.deploySafe({
  //     safeAccountConfig,
  // });

  // const newSafeAddress = await safeSdk.getAddress();
  const safeAddress = "0x002f897b24E6D0f94599D17C1ef9b9d7c9d4A7e8";
  const safeSdk = await Safe.create({ ethAdapter, safeAddress,contractNetworks });

  const safeTransactionData: SafeTransactionDataPartial = {
    to: "0x9C5e3cAC8166eD93F76BC0469b8Bf3ca715bA6B7",
    data: "0x00",
    value: "0",
  };

  console.log(safeAddress);
  const safeTransaction = await safeSdk.createTransaction({
    safeTransactionData,
  });
  console.log(safeTransaction);

  const safeTxHash = await safeSdk.getTransactionHash(safeTransaction);
  console.log(safeTxHash)
  const senderSignature = await safeSdk.signTransactionHash("0x56da3ae680cf1a0a8c9de5d0fd6601ea0abe308d188dca8e152b500a962979ad");
  console.log(senderSignature)
//   await safeService.proposeTransaction({
//     safeAddress,
//     safeTransactionData: safeTransaction.data,
//     safeTxHash,
//     senderAddress: "0x0D1781F0b693b35939A49831A6C799B938Bd2F80",
//     senderSignature: senderSignature.data,
//   });

// //   let signature = await safeSdk.signTransactionHash(safeTxHash);
//   await safeService.confirmTransaction(safeTxHash, senderSignature.data);

//   const executeTxResponse = await safeSdk.executeTransaction(safeTransaction);
//   const receipt =
//     executeTxResponse.transactionResponse &&
//     (await executeTxResponse.transactionResponse.wait());

//   console.log(receipt);
}
main();

