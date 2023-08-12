// Web3Auth Libraries
import { CHAIN_NAMESPACES } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { Chain } from "wagmi";

const name = "DataPonte";
const iconUrl = "https://web3auth.io/docs/contents/logo-ethereum.png";

export default function Web3AuthConnectorInstance(chains: Chain[]) {
  // Create Web3Auth Instance

  const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x1a4",
    rpcTarget: "https://optimism-goerli.public.blastapi.io	", // This is the public RPC we have added, please pass on your own endpoint while creating an app
    displayName: "Optimistic Goerli",
    tickerName: "ETH Goerli",
    ticker: "ETH",
    blockExplorer: "https://goerli-optimism.etherscan.io/" as string,
  }

  const web3AuthInstance = new Web3AuthNoModal({
    clientId: process.env.WEB3AUTH || 'BIAXgpC0-jqizRK_mHoz1PjjIsDLuBhTfJjlHniMOa6IEyEQmyosZXK5_z9Xhg_FJiu6tilRgJxz1mEZfMJRY04',
    chainConfig,
    web3AuthNetwork: "testnet",
  });

  const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });

  // Add openlogin adapter for customisations
  const openloginAdapterInstance = new OpenloginAdapter({
    privateKeyProvider,
    adapterSettings: {
      network: "testnet",
      uxMode: "popup",
      whiteLabel: {
        name,
        logoLight: iconUrl,
        logoDark: iconUrl,
        defaultLanguage: "en",
        dark: true, // whether to enable dark mode. defaultValue: false
      },
    },
  });
  web3AuthInstance.configureAdapter(openloginAdapterInstance);

  return new Web3AuthConnector({
    chains: chains,
    options: {
      web3AuthInstance,
      loginParams: {
        loginProvider: "google",
      },
    },
  });
}