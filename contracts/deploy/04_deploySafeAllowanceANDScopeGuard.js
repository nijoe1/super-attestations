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

    const EAS_Optimism = "0x4200000000000000000000000000000000000021"
    const FactoryOptimism = "0x4023B304553184AA15105418Ef00EA69Fb13a562"

    const PaymasterAllowance = await hre.ethers.getContractFactory("paymasterAllowance");
    const paymasterAllowance = await PaymasterAllowance.deploy(EAS_Optimism, FactoryOptimism);
    await paymasterAllowance.deployed();

    console.log("paymasterAllowance Address=> ", paymasterAllowance.address);

    let targetAddressAllowedOptimism = "0x00342806eabAAA926970576BFB518f310200FF41"

    const ScopeGuard = await hre.ethers.getContractFactory("ScopeGuard");
    const scopeGuard = await ScopeGuard.deploy();
    await scopeGuard.deployed();

    console.log("scopeGuad Address=> ", scopeGuard.address);

    const scopeGuardInstance = ScopeGuard.attach(scopeGuard.address)

    let tx = await scopeGuardInstance.setTargetAllowed(targetAddressAllowedOptimism, true)
    await tx.wait()
    console.log("done")

};