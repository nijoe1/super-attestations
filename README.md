# SuperAttestations

## 🦸Welcome to SUPER ATTESTATIONS🦸 
<img src="https://gateway.lighthouse.storage/ipfs/QmeJWU35G1F1JUMw5PsW2UaCYp3n3NmStrBiymuAQmGu28">

### This repo is a merge of those repos created for the ETHGLOBAL Supehack
- [client](https://github.com/tse-lao/data-library)
- [contracts](https://github.com/nijoe1/superAttestations)

## Description

Redefining Content Validation & Access. Empowering data providers, verifiers, and subscription NFTs, we introduce innovative content validation, access, and verifiable credentials. Join us in revolutionizing content ecosystems and trust across industries.

### Data Providers (Attestors):

Our platform thrives on the contributions of data providers, also known as attestors. Attestors are individuals or entities who submit a wide array of digital content, meticulously tailored to specific contexts and themes. These submissions serve as the foundation of our content ecosystem, ensuring diversity and relevance.

### Data Verifiers (Attestation Revokers):

Expert verifiers, as well as community members, play a pivotal role within SuperAttest. These verifiers meticulously review and rate the submitted content, guaranteeing that only top-tier quality content makes the cut. Their role ensures that every piece of verified content upholds the highest standards, ultimately leading to its tokenization as NFTs (Non-Fungible Tokens).

### Subscription NFTs (Verified Data Groups):

One of our groundbreaking concepts is the introduction of subscription NFTs. These NFTs represent verified data groups, providing subscribers with the key to unlock and access decrypted content. Subscribers equipped with subscription NFTs can delve into exclusive insights and information from data providers. This feature cultivates a trusted environment where only authorized subscribers gain access, safeguarding the integrity of the data.

### Distribution of Minting Funds:

Within SuperAttest, fairness is a core principle. Minting funds for each Data Vault are distributed equitably among attestors who have conducted verified attestations, all thanks to the Third WEB splitter contract. This decentralized mechanism ensures that those who contribute accurate attestations are rewarded accordingly. The distribution of funds is seamlessly calculated within each Data Vault's smart contract, guaranteeing transparency and integrity.

#### SuperAttest Impacts Various Industries:

- Entertainment: NFTs for genre-specific content.
- Education: Validated educational content accessible via NFTs.
- Journalism: Trusted journalism through tokenized news.
- Research: Peer-reviewed research via NFTs.
- Brands: Authentic advertising via tokenized campaigns.

With SuperAttest, we're shaping the future of content validation and access, fostering a collaborative ecosystem where data providers, verifiers, and subscribers work harmoniously to establish new standards of quality, trust, and authenticity.


## TECHNOLOGIES USED

### ETHEREUM ATTESTATION SERVICE

SuperAttestations harnesses the power of the Ethereum Attestation Service (EAS) to empower users in designing their subscription-based schemas. These customizable schemas play a pivotal role in defining the rules of attestation, revocation, and the duration of revocation periods. This innovation is facilitated through the implementation of a superResolver proxy factory, a cornerstone of our platform's architecture. Attesters contribute data, revokers meticulously verify the submitted content, and subscribers gain access to decrypt the attestation content. This synergy of elements within the EAS framework ensures a robust and secure ecosystem, where data validation and access are elevated to new levels of transparency and trust.

- [SuperResolverFactory](https://github.com/nijoe1/super-attestations/blob/main/contracts/contracts/superAttestationsSchemaFactory.sol)
- [SuperResolver](https://github.com/nijoe1/super-attestations/blob/main/contracts/contracts/superResolver.sol)

### WORLDCOIN X LAYER ZERO

We created a human verification soulbound badge ERC721 token that can get claimed once.
This token is then minted on the Base Blockchain using the Layer Zero protocol
- [CrossChainTransaction](https://testnet.layerzeroscan.com/10132/address/0x1cf8ed1107427fe78e89938c3988376523569a48/message/10160/address/0xb84c99e037f326157fe9196c89a0464f6202c9bb/nonce/1)
- [Optimism Worldcoin contract](https://goerli-optimism.etherscan.io/address/0x1cf8ed1107427fe78e89938c3988376523569a48#code)_
- [Base Destination contract](https://goerli.basescan.org/address/0xb84C99e037f326157Fe9196c89A0464F6202C9bb#code)

### OPTIMISM & BASE

SuperAttestations is built on the foundation of the Ethereum Attestation Service (EAS) protocol, allowing us to offer unparalleled customization in determining who can access, attest, and revoke on attestations. Through this robust infrastructure, we provide the flexibility to token-gate schemas, enabling time-based subscriptions and encrypted access via IPFS and Lighthouse data. This dynamic approach ensures that subscribers gain exclusive access to the attested content, fostering a secure and transparent environment within the SuperAttestations ecosystem. Our integration with the Optimism and Base chains further extends this functionality, creating a seamless experience for our users across multiple blockchain networks.

#### OPTIMISM GOERLI CONTRACTS
  - [SuperResolverFactory](https://goerli-optimism.etherscan.io/address/0x4023B304553184AA15105418Ef00EA69Fb13a562#code)
  - [SuperResolverImplementation](https://goerli-optimism.etherscan.io/address/0xCb322BA199Df65C793A93F1ac2ECf49Ab00f19F3#code)
  - [WORLDCOIN-SOULBOUND-TOKEN](https://goerli-optimism.etherscan.io/address/0x1Cf8eD1107427Fe78E89938c3988376523569A48)
  - [CustomTokenGatedFactoryContract](https://goerli-optimism.etherscan.io/address/0x42408c20A51F4C2068CC4B1fc94A19c7fc18d4F0)

#### BASE GOERLI CONTRACTS
  - [SuperResolverFactory](https://goerli.basescan.org/address/0xCF0374a618403D2eF29F100fb1fF2Ca16cc3eb95#code)
  - [SuperResolverImplementation](https://goerli.basescan.org/address/0x1CA26139eF51e754326bce8066DD335560E987D5#code)
  - [WORLDCOIN-DESTINATION-TOKEN](https://goerli.basescan.org/address/0xb84C99e037f326157Fe9196c89A0464F6202C9bb#code)
  - [CustomTokenGatedFactoryContract](https://goerli.basescan.org/address/0xCF0374a618403D2eF29F100fb1fF2Ca16cc3eb95#code)

### THEGRAPH

Leveraging The Graph's capabilities, we've deployed SubGraphs to meticulously index all the Data Vaults created on both the Goerli Optimism and Goerli Base chains. This strategic deployment ensures that our platform seamlessly accesses and organizes the vast array of data within these vaults, enhancing the efficiency and effectiveness of our system.

- [SubGraph](https://github.com/tse-lao/attestations)
- [SubGraph](https://github.com/tse-lao/superattestation)

  
### SAFE X GELATO

We've harnessed the power of Safe Paymaster in conjunction with ScopeGuard from Zodiac and the Gelato network. While we haven't yet integrated it directly into the application, our plans include showcasing a successful sponsored transaction on the Optimism chain. This strategic approach ensures a secure and seamless payment mechanism, further enhancing the user experience within the SuperAttestations platform.

- [Safe-Paymaster-Contracts](https://github.com/nijoe1/super-attestations/tree/main/contracts/contracts/Safe_Paymaster)
- [SafexGelatoScripts](https://github.com/nijoe1/super-attestations/tree/main/contracts/scripts)


## What is next for the SuperAttestations platform?

The SuperAttestations platform is poised for dynamic growth. Our upcoming plans include developing an SDK for seamless integration and empowering others to harness our platform's capabilities. We're also introducing tag-based queries for efficient content discovery and integrating off-chain attestations through EAS, creating a feedback layer for DataVaults. These initiatives will enhance user experience, expand utility, and bolster transparency, marking our continued commitment to revolutionizing content validation, access, and trust.


