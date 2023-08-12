"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Chain, WagmiConfig, configureChains, createConfig } from "wagmi";

import { InjectedConnector } from "wagmi/connectors/injected";
import { publicProvider } from "wagmi/providers/public";


import { AddressWrapper } from "@/components/core/account/address-wrapper";
import { baseGoerli, optimismGoerli ,goerli} from "wagmi/chains";
import Web3AuthConnectorInstance from "./Web3AuthConnectorInstance";
import Navbar from "./nav-bar";

// Configure chains & providers with the Public provider.

export const polygonMumbai = {
  id: 80_001,
  name: 'Polygon Mumbai',
  network: 'maticmum',
  nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
  rpcUrls: {
    alchemy: {
      http: ['https://polygon-mumbai.g.alchemy.com/v2'],
      webSocket: ['wss://polygon-mumbai.g.alchemy.com/v2'],
    },
    infura: {
      http: ['https://polygon-mumbai.infura.io/v3'],
      webSocket: ['wss://polygon-mumbai.infura.io/ws/v3'],
    },
    default: {
      http: ['https://polygon-mumbai-bor.publicnode.com	'],
    },
    public: {
      http: ['https://polygon-mumbai-bor.publicnode.com	'],
    },
  },
  blockExplorers: {
    etherscan: {
      name: 'PolygonScan',
      url: 'https://mumbai.polygonscan.com',
    },
    default: {
      name: 'PolygonScan',
      url: 'https://mumbai.polygonscan.com',
    },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 25770160,
    },
  },
  testnet: true,
} as const satisfies Chain;
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [optimismGoerli, baseGoerli],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true,
      },
    }),
    Web3AuthConnectorInstance(chains),
  ],
  publicClient,
  webSocketPublicClient,
});

let links = [
  {
    href: "/",
    name: "Home",
  },
  {
    href: "/attestation",
    name: "Libraries",
  },
];

export default function App({ children }: { children: any }) {
  return (
    <main>
      <WagmiConfig config={config}>
        <Navbar links={links} />

        <AddressWrapper>
          {children}
          <ToastContainer position="bottom-center" />
        </AddressWrapper>
      </WagmiConfig>
    </main>
  );
}
