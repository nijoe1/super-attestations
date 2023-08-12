require("hardhat-deploy");
require("hardhat-deploy-ethers");
const {
    EAS,
    Offchain,
    SchemaEncoder,
    SchemaRegistry,
} = require("@ethereum-attestation-service/eas-sdk");

const { ethers } = require("hardhat");
const { Console } = require("console");

const private_key = network.config.accounts[0];

const wallet = new ethers.Wallet(private_key, ethers.provider);

module.exports = async({ deployments }) => {
    const { deploy } = deployments;
    console.log("Wallet+ Ethereum Address:", wallet.address);

    const EAS_OPTIMISM = "0x1a5650d0ecbca349dd84bafa85790e3e6955eb84";
    const REGISTRY_OPTIMISM = "0x7b24C7f8AF365B4E308b6acb0A7dfc85d034Cb3f";
    const THIRDWEB_FACTORY_OPTIMISM =
        "0xd24b3de085CFd8c54b94feAD08a7962D343E6DE0";
    const THIRDWEB_SPLITTER_IMPL_OPTIMISM =
        "0x7e80648EB2071E26937F9D42A513ccf4815fc702";
    //  Deploy the superAttestationsSchemaFactory

    const SuperResolver = await hre.ethers.getContractFactory("superResolver");
    const superResolver = await SuperResolver.deploy(
        EAS_OPTIMISM
    );
    await superResolver.deployed();

    console.log("superResolver Address=> ", superResolver.address);

    const superAttestationsSchemaFactory = await hre.ethers.getContractFactory(
        "superAttestationsSchemaFactory"
    );

    const EAS = await hre.ethers.getContractFactory("EAS");
    const EASInstance = await EAS.attach(
        EAS_OPTIMISM
    );
    const superAttestationsSchema = await superAttestationsSchemaFactory.deploy(
        REGISTRY_OPTIMISM,
        superResolver.address,
        THIRDWEB_FACTORY_OPTIMISM,
        THIRDWEB_SPLITTER_IMPL_OPTIMISM
    );
    await superAttestationsSchema.deployed();

    console.log("Factory Address=> ", superAttestationsSchema.address);

    const superAttestationsSchemaFactoryInstance =
        await superAttestationsSchemaFactory.attach(
            superAttestationsSchema.address
        );

    // OpenAttest & OpenRevoke
    const tokenGateAddresses = [
        "0x0000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000001",
    ];
    const tokenGateEnum = [0, 0];

    const tokenGateTokenID = [0, 0];

    let params = ["Test attestation schema v3", "description of the testing superSchema", [], 0, "string test, uint256 testUint", 0, 0, true];
    let tx = await superAttestationsSchemaFactoryInstance.createSuperSchema(
        tokenGateAddresses,
        tokenGateEnum,
        tokenGateTokenID,
        params, { value: 0 }
    );
    let newResolver = await tx.wait();
    console.log(newResolver.logs[0].address);

    const SuperResolverInstance = await SuperResolver.attach(
        newResolver.logs[0].address
    );

    // Needs to get changed every time a new superResolver contract is created
    const schemaUID = "0xccb47cd921cf35823aa221d89f124190943507c688c25bd65611c974262208e5"
    tx = await EASInstance.attest([schemaUID, [wallet.address, 0, true, "0x0000000000000000000000000000000000000000000000000000000000000000", "0x00", 0]], { value: 0, gasLimit: 1000000 });
    tx = await tx.wait();
    console.log("attested")


    tx = await superAttestationsSchemaFactoryInstance.mint(schemaUID, 1, { value: 0, gasLimit: 1000000 });
    tx = await tx.wait();
    console.log("mint")
    tx = await superAttestationsSchemaFactoryInstance.hasAccess(schemaUID, wallet.address)
    console.log(tx)

    tx = await SuperResolverInstance.resolveAttestations({ gasLimit: 10000000 });
    tx = await tx.wait();
    console.log("split")



};