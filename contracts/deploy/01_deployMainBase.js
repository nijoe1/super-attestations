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

    const EAS_BASE = "0xAcfE09Fd03f7812F022FBf636700AdEA18Fd2A7A";
    const REGISTRY_BASE = "0x720c2bA66D19A725143FBf5fDC5b4ADA2742682E";
    const THIRDWEB_FACTORY_BASE =
        "0x76F948E5F13B9A84A81E5681df8682BBf524805E";
    const THIRDWEB_SPLITTER_IMPL_BASE =
        "0x50C921e598bdcB2A81aE2Fad357798dFAb322BB0";

    //  Deploy the superAttestationsSchemaFactory

    const SuperResolver = await hre.ethers.getContractFactory("superResolver");
    const superResolver = await SuperResolver.deploy(
        EAS_BASE
    );
    await superResolver.deployed();

    console.log("superResolver Address=> ", superResolver.address);

    const superAttestationsSchemaFactory = await hre.ethers.getContractFactory(
        "superAttestationsSchemaFactory"
    );

    const EAS = await hre.ethers.getContractFactory("EAS");
    const EASInstance = await EAS.attach(
        EAS_BASE
    );
    const superAttestationsSchema = await superAttestationsSchemaFactory.deploy(
        REGISTRY_BASE,
        superResolver.address,
        THIRDWEB_FACTORY_BASE,
        THIRDWEB_SPLITTER_IMPL_BASE
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