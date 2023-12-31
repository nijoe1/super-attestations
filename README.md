# SuperAttestations

## 🦸Welcome to SUPER ATTESTATIONS🦸 
<img src="https://gateway.lighthouse.storage/ipfs/QmeJWU35G1F1JUMw5PsW2UaCYp3n3NmStrBiymuAQmGu28">

### This repo is a merge of those repos created for the ETHGLOBAL SUPERHACK
- [client](https://github.com/tse-lao/data-library)
- [contracts](https://github.com/nijoe1/superAttestations)

## Description

Redefining Content Validation & Access. Empowering data providers, verifiers, and subscription NFTs, we introduce innovative content validation, access, and verifiable credentials. Join us in revolutionizing content ecosystems and trust across industries.

### Data Vaults (Libraries):

A Data Vault within the SuperAttest ecosystem represents a carefully curated repository of digital content, embodying themes, contexts, or industries. These specialized libraries are meticulously designed with token-gated mechanisms, dictating the participants who can contribute content, validate it, and revoke attestations, as well as defining subscription costs for access. Essentially, Data Vaults serve as controlled environments where data providers, verifiers, and subscribers engage harmoniously, ensuring the authenticity and controlled distribution of content. These vaults empower creators to tailor access dynamics, facilitating exclusive content while redefining content validation paradigms across diverse sectors.

SuperAttest's Data Vaults reshape content validation by combining content management, quality control, and controlled access. These repositories foster collaboration and integrity among data providers, verifiers, and subscribers, establishing new benchmarks in content credibility and accessibility. Through strategic ***token-gated options*** ( ***ERC721 - ERC1155 - ERC20 - ONLY HUMANS using WORLDCOIN - ZKERC1155 using ([SISMO](https://github.com/nijoe1/super-attestations/blob/main/contracts/contracts/TokenGatedContracts.sol/ERC1155/ZKAccessControl.sol)***) ) we ***restrict*** who can ***Provide*** and who can ***Verify Data***, each Data Vault maintains a distinct ecosystem, promoting trust and innovation across industries, thus epitomizing the revolutionary potential of the SuperAttest platform.

### Data Providers (Attestors):

Our platform thrives on the contributions of data providers, also known as attestors. Attestors are individuals or entities who submit a wide array of digital content, meticulously tailored to specific contexts and themes. These submissions serve as the foundation of our content ecosystem, ensuring diversity and relevance.

### Data Verifiers (Attestation Revokers):

Expert verifiers, as well as community members, play a pivotal role within SuperAttest. These verifiers meticulously review and rate the submitted content, guaranteeing that only top-tier quality content makes the cut. Their role ensures that every piece of verified content upholds the highest standards, ultimately leading to its tokenization as NFTs (Non-Fungible Tokens).

### Subscription NFTs (Verified Data Groups):

One of our groundbreaking concepts is the introduction of subscription NFTs. These NFTs represent verified data groups, providing subscribers with the key to unlock and access decrypted content. Subscribers equipped with subscription NFTs can delve into exclusive insights and information from data providers. This feature cultivates a trusted environment where only authorized subscribers gain access, safeguarding the integrity of the data. [subscribe function](https://github.com/nijoe1/super-attestations/blob/main/contracts/contracts/superAttestationsSchemaFactory.sol#L181) & [hasAccess function](https://github.com/nijoe1/super-attestations/blob/main/contracts/contracts/superAttestationsSchemaFactory.sol#L203) 

### Distribution of Minting Funds:

Within SuperAttest, fairness is a core principle. Minting funds for each Data Vault are distributed equitably among attestors who have conducted verified attestations, all thanks to the Third WEB splitter contract. This decentralized mechanism ensures that those who contribute accurate attestations are rewarded accordingly. The distribution of funds is seamlessly calculated within each Data Vault's [smart contract](https://github.com/nijoe1/super-attestations/blob/main/contracts/contracts/superResolver.sol#L188), guaranteeing transparency and integrity.

#### SuperAttest Impacts Various Industries:

- Entertainment: NFTs for genre-specific content.
- Education: Validated educational content accessible via NFTs.
- Journalism: Trusted journalism through tokenized news.
- Research: Peer-reviewed research via NFTs.
- Brands: Authentic advertising via tokenized campaigns.

With SuperAttest, we're shaping the future of content validation and access, fostering a collaborative ecosystem where data providers, verifiers, and subscribers work harmoniously to establish new standards of quality, trust, and authenticity.


## TECHNOLOGIES USED
  
### ETHEREUM ATTESTATION SERVICE

SuperAttestations harnesses the power of the Ethereum Attestation Service (EAS) to empower users in designing their subscription-based schemas. These customizable schemas play a pivotal role in defining the rules of attestation, revocation, and the duration of revocation periods. This innovation is facilitated by implementing a superResolver proxy factory, a cornerstone of our platform's architecture. Attesters contribute data, revokers meticulously verify the submitted content, and subscribers gain access to decrypt the attestation content. This synergy of elements within the EAS framework ensures a robust and secure ecosystem, where data validation and access are elevated to new levels of transparency and trust.

- [SuperResolverFactory](https://github.com/nijoe1/super-attestations/blob/main/contracts/contracts/superAttestationsSchemaFactory.sol)
- [SuperResolver](https://github.com/nijoe1/super-attestations/blob/main/contracts/contracts/superResolver.sol)

### WORLDCOIN X LAYER ZERO

We created a ***human verification soulbound badge ERC721 token that can get claimed once***.
This token is then minted on the Base Blockchain using **Layer Zero**.
- [CrossChainTransaction LayerZeroScan](https://testnet.layerzeroscan.com/10132/address/0x1cf8ed1107427fe78e89938c3988376523569a48/message/10160/address/0xb84c99e037f326157fe9196c89a0464f6202c9bb/nonce/1)
- [Optimism Worldcoin cross chain mint](https://goerli-optimism.etherscan.io/tx/0xd7943c079205ffae67b38d5774ccbe06fe75e18079fca0b97ab975750a3cacc9)
- [Optimism Worldcoin contract](https://goerli-optimism.etherscan.io/address/0x1cf8ed1107427fe78e89938c3988376523569a48)
- [Base Destination contract](https://goerli.basescan.org/address/0xb84C99e037f326157Fe9196c89A0464F6202C9bb#code)
- [Goerli Destination contract](https://goerli.etherscan.io/address/0xda45e5ad945bc5330f7a6f0d3504cbbfc5fd401a#internaltx)

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

- [Events](https://github.com/nijoe1/super-attestations/blob/main/contracts/contracts/superAttestationsSchemaFactory.sol#L59)
- [SubGraph-OptimismGoerli](https://github.com/tse-lao/superattestation)
- [SubGraph-BaseGoerli](https://github.com/tse-lao/baseGraph)

  
### SAFE X GELATO

We've harnessed the power of Safe Paymaster in conjunction with ScopeGuard from Zodiac and the Gelato network. While we haven't yet integrated it directly into the application, our plans include showcasing a successful sponsored transaction on the Optimism chain. This strategic approach ensures a secure and seamless payment mechanism, further enhancing the user experience within the SuperAttestations platform.

- [Safe-Paymaster-Contracts](https://github.com/nijoe1/super-attestations/tree/main/contracts/contracts/Safe_Paymaster)
- [SafexGelatoScripts](https://github.com/nijoe1/super-attestations/tree/main/contracts/scripts)
- [SetGuard transaction](https://goerli-optimism.etherscan.io//tx/0xcbee5a8e54649b43cec8e4324280e1a0c65f5bd1aed4b5f72f5110edc232f39c#eventlog)
- [Sponsored transaction attest](https://goerli-optimism.etherscan.io//tx/0x3d00d0ed84ac9b95b3257619b485b8074cc5ca10912892699dbb58c81846625e)
- [Sponsored transaction2 attest](https://goerli-optimism.etherscan.io//tx/0xab3271567f4b56450b81bfc13e7c824ae2dec740ba138c5174f077bba7c04c96)

Our safe implementation guard only allows transactions to get executed from this [contract paymaster allowance](https://goerli-optimism.etherscan.io/address/0x00342806eabaaa926970576bfb518f310200ff41#code) that allows only our application transactions to get sponsored ***"Only for the Attestation schemas created by our Factory contract"***
  
## What is next for the SuperAttestations platform?

The SuperAttestations platform is poised for dynamic growth. Our upcoming plans include developing an SDK for seamless integration and empowering others to harness our platform's capabilities. We're also introducing tag-based queries for efficient content discovery and integrating off-chain attestations through EAS, creating a feedback layer for DataVaults. These initiatives will enhance user experience, expand utility, and bolster transparency, marking our continued commitment to revolutionizing content validation, access, and trust.


