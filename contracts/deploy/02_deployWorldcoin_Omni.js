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

    const WorldcoinOptimism = "0x58BF811321D2E953FcfbCA4CdEB7DB73beB72386"
    const appID = "app_47ce5bdefaafbbecce98304424156ae9"
    const actionID = "superattestations"

    const OmniChainOptimismEntrypoint = "0xae92d5aD7583AD66E49A0c67BAd18F6ba52dDDc1"
    const OmniChainBaseEntrypoint = "0x6aB5Ae6822647046626e83ee6dB8187151E1d5ab"

    const HumanBadge = await hre.ethers.getContractFactory("HumanBadge");
    const humanBadge = await HumanBadge.deploy(WorldcoinOptimism, appID, actionID, OmniChainOptimismEntrypoint);
    await humanBadge.deployed();

    console.log("humanBadge Address=> ", humanBadge.address);

    const humanBadgeInstance = await HumanBadge.attach(
        "0x2B4b59510E206894f3F6b28FadBe9138072BA8F7"
    );

    let txx = await humanBadgeInstance.trustAddress("0x374BB8e596bC29fA2C3Ad3cC2c8c257fD6d437D6");
    await txx.wait();

    console.log(txx);

    const HumanBadgeDest = await hre.ethers.getContractFactory(
        "CrossChainHumanBadge"
    );

    const humanBadgeDest = await HumanBadgeDest.deploy(OmniChainBaseEntrypoint);
    await humanBadgeDest.deployed();

    console.log("humanBadge Address=> ", humanBadgeDest.address);

    const humanBadgeDestInstance = await HumanBadgeDest.attach(
        "0x374BB8e596bC29fA2C3Ad3cC2c8c257fD6d437D6"
    );

    txx = await humanBadgeDestInstance.trustAddress("0x2B4b59510E206894f3F6b28FadBe9138072BA8F7");
    await txx.wait();
};