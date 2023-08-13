import { BytesLike, ethers } from "ethers";
import { GelatoRelayPack } from "@safe-global/relay-kit";
import Safe, {
  EthersAdapter,
  getSafeContract,
} from "@safe-global/protocol-kit";
import {
  MetaTransactionData,
  MetaTransactionOptions,
  OperationType,
  RelayTransaction,
} from "@safe-global/safe-core-sdk-types";
import {
  EAS,
  Delegated,
  ZERO_BYTES32,
  EIP712AttestationParams,
} from "@ethereum-attestation-service/eas-sdk";
import * as dotenv from "dotenv";

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const GELATO_RELAY_API_KEY = process.env.GELATO_RELAY_API_KEY;

// Customize the following variables
// https://chainlist.org
const RPC_URL = process.env.RPC_URL
// @ts-ignore
const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
// @ts-ignore
const signer = new ethers.Wallet(PRIVATE_KEY as BytesLike, provider);

const safeAddress = "0x002f897b24E6D0f94599D17C1ef9b9d7c9d4A7e8"; // Safe from which the transaction will be sent. Replace with your Safe address
const chainId = 420;

// Get Gelato Relay API Key: https://relay.gelato.network/

// Usually a limit of 21000 is used but for smart contract interactions, you can increase to 100000 because of the more complex interactions.
const gasLimit = "100000";
let abi = [ { inputs: [ { internalType: "contract IEAS", name: "_eas", type: "address" }, { internalType: "contract ICheckAccess", name: "_superAttestationsFactory", type: "address", }, ], stateMutability: "nonpayable", type: "constructor", }, { inputs: [ { components: [ { internalType: "bytes32", name: "schema", type: "bytes32" }, { components: [ { internalType: "address", name: "recipient", type: "address" }, { internalType: "uint64", name: "expirationTime", type: "uint64", }, { internalType: "bool", name: "revocable", type: "bool" }, { internalType: "bytes32", name: "refUID", type: "bytes32" }, { internalType: "bytes", name: "data", type: "bytes" }, { internalType: "uint256", name: "value", type: "uint256" }, ], internalType: "struct AttestationRequestData", name: "data", type: "tuple", }, ], internalType: "struct AttestationRequest", name: "request", type: "tuple", }, ], name: "attest", outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }], stateMutability: "payable", type: "function", }, { inputs: [ { components: [ { internalType: "bytes32", name: "schema", type: "bytes32" }, { components: [ { internalType: "address", name: "recipient", type: "address" }, { internalType: "uint64", name: "expirationTime", type: "uint64", }, { internalType: "bool", name: "revocable", type: "bool" }, { internalType: "bytes32", name: "refUID", type: "bytes32" }, { internalType: "bytes", name: "data", type: "bytes" }, { internalType: "uint256", name: "value", type: "uint256" }, ], internalType: "struct AttestationRequestData", name: "data", type: "tuple", }, { components: [ { internalType: "uint8", name: "v", type: "uint8" }, { internalType: "bytes32", name: "r", type: "bytes32" }, { internalType: "bytes32", name: "s", type: "bytes32" }, ], internalType: "struct EIP712Signature", name: "signature", type: "tuple", }, { internalType: "address", name: "attester", type: "address" }, ], internalType: "struct DelegatedAttestationRequest", name: "delegatedRequest", type: "tuple", }, ], name: "attestByDelegation", outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }], stateMutability: "payable", type: "function", }, { inputs: [ { components: [ { internalType: "bytes32", name: "schema", type: "bytes32" }, { components: [ { internalType: "bytes32", name: "uid", type: "bytes32" }, { internalType: "uint256", name: "value", type: "uint256" }, ], internalType: "struct RevocationRequestData", name: "data", type: "tuple", }, ], internalType: "struct RevocationRequest", name: "request", type: "tuple", }, ], name: "revoke", outputs: [], stateMutability: "payable", type: "function", }, { inputs: [ { components: [ { internalType: "bytes32", name: "schema", type: "bytes32" }, { components: [ { internalType: "bytes32", name: "uid", type: "bytes32" }, { internalType: "uint256", name: "value", type: "uint256" }, ], internalType: "struct RevocationRequestData", name: "data", type: "tuple", }, { components: [ { internalType: "uint8", name: "v", type: "uint8" }, { internalType: "bytes32", name: "r", type: "bytes32" }, { internalType: "bytes32", name: "s", type: "bytes32" }, ], internalType: "struct EIP712Signature", name: "signature", type: "tuple", }, { internalType: "address", name: "revoker", type: "address" }, ], internalType: "struct DelegatedRevocationRequest", name: "delegatedRequest", type: "tuple", }, ], name: "revokeByDelegation", outputs: [], stateMutability: "payable", type: "function", }, ];
let iface = new ethers.utils.Interface(abi);

const safeTransactionData: MetaTransactionData = {
  to: safeAddress,
  data: "0x00", // leave blank for ETH transfers
  value: "0",
  operation: OperationType.DelegateCall,
};
const options: MetaTransactionOptions = {
  gasLimit,
  isSponsored: false,
};

// Create the Protocol and Relay Kits instances

async function relayTransaction() {
  const delegated = new Delegated({
    address: "0x4200000000000000000000000000000000000021",
    chainId: Number("420"),
    version: "1.0.0",
  });

  // Signing the delegated attestation request using eas.sdk version 0.27.0

  const delegatedAttestation = await delegated.signDelegatedAttestation(
    {
      schema:
        "0xCC34088DF6FAD69FAB90A30D18B136CAE55F5793CD46655936DC97690211FDEF",
      recipient: "0x4A13F4394cF05a52128BdA527664429D5376C67f",
      //   @ts-ignore
      expirationTime: ethers.BigNumber.from(0),
      revocable: true,
      refUID: ZERO_BYTES32,
      data: "0x000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000c4e6577205475746f7269616c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002e516d574c52524e323976477152684833506d4b774c3442694a3772685972597253726b6b69777653384b7a4d705700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000174e657720626c6f636b636861696e207475746f7269616c000000000000000000",
      // ----
      //   @ts-ignore
      nonce: ethers.BigNumber.from(0),
    },
    signer
  );
  // @ts-ignore
  let attestData = [
    "0xCC34088DF6FAD69FAB90A30D18B136CAE55F5793CD46655936DC97690211FDEF",
    [
      "0x0000000000000000000000000000000000000000",
      0,
      true,
      ZERO_BYTES32,
      "0x000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000c4e6577205475746f7269616c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002e516d574c52524e323976477152684833506d4b774c3442694a3772685972597253726b6b69777653384b7a4d705700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000174e657720626c6f636b636861696e207475746f7269616c000000000000000000",
      0,
    ],
    [
      delegatedAttestation?.signature.v,
      delegatedAttestation?.signature.r,
      delegatedAttestation.signature.s,
    ],
    signer.address,
  ];
  console.log(attestData);

  const verified = delegated.verifyDelegatedAttestationSignature(
    signer.address,
    delegatedAttestation
  );

  console.log(verified);

  let txdata = iface.encodeFunctionData("attestByDelegation", [attestData]);

  // Setting transaction data to be send to the Safe Paymaster
  safeTransactionData.data = txdata;

  const ethAdapter = new EthersAdapter({
    ethers,
    signerOrProvider: signer,
  });

  const safeSDK = await Safe.create({
    ethAdapter,
    safeAddress,
  });

  // Relaying an attestation by delegate

  const relayKit = new GelatoRelayPack(GELATO_RELAY_API_KEY);

  // Prepare the transaction
  const safeTransaction = await safeSDK.createTransaction({
    safeTransactionData,
  });
  const safeSingletonContract = await getSafeContract({
    ethAdapter,
    safeVersion: await safeSDK.getContractVersion(),
  });

  const signedSafeTx = await safeSDK.signTransaction(safeTransaction);
  const encodedTx = safeSingletonContract.encode("execTransaction", [
    signedSafeTx.data.to,
    signedSafeTx.data.value,
    signedSafeTx.data.data,
    signedSafeTx.data.operation,
    signedSafeTx.data.safeTxGas,
    signedSafeTx.data.baseGas,
    signedSafeTx.data.gasPrice,
    signedSafeTx.data.gasToken,
    signedSafeTx.data.refundReceiver,
    signedSafeTx.encodedSignatures(),
  ]);

  const relayTransaction: RelayTransaction = {
    target: safeAddress,
    encodedTransaction: encodedTx,
    chainId: chainId,
    options,
  };

  const response = await relayKit.relayTransaction(relayTransaction);

  // Sponsored attestetion made congrads
  console.log(
    `Relay Transaction Task ID: https://relay.gelato.digital/tasks/status/${response.taskId}`
  );
}

relayTransaction();
