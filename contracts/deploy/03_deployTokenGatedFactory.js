require("hardhat-deploy");
require("hardhat-deploy-ethers");

const { ethers } = require("hardhat");
const { Console } = require("console");

const private_key = network.config.accounts[0];

const wallet = new ethers.Wallet(private_key, ethers.provider);

module.exports = async({ deployments }) => {
    const { deploy } = deployments;
    console.log("Wallet+ Ethereum Address:", wallet.address);

    const SismoGlobalVerifier = await hre.ethers.getContractFactory("sismoGlobalVerifier")
    let appId = "0x54c31943e929a55cbd8da2251dd3bc08"
    const sismoGlobalVerifier = await SismoGlobalVerifier.deploy(appId)
    await sismoGlobalVerifier.deployed()

    console.log("sismoGlobalVerifier  :", sismoGlobalVerifier.address)

    const ZKAccessControl = await hre.ethers.getContractFactory("AccessControl");
    const ZKaccessControl = await ZKAccessControl.deploy();
    await ZKaccessControl.deployed();

    console.log("ZKaccessControl implementation Address=> ", ZKaccessControl.address);

    const AccessControl = await hre.ethers.getContractFactory("AccessControl");
    const accessControl = await AccessControl.deploy();
    await accessControl.deployed();

    console.log("accessControl implementation Address=> ", accessControl.address);

    const AccessFactory = await hre.ethers.getContractFactory(
        "AccessFactory"
    );

    const accessFactory = await AccessFactory.deploy(accessControl.address, ZKaccessControl.address, sismoGlobalVerifier.address);
    await accessFactory.deployed();

    console.log("accessFactory Address=> ", accessFactory.address);

};