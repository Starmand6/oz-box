// scripts/deploy_upgradeable_adminbox.js
const { ethers, upgrades } = require("hardhat");

async function main() {
    const AdminBox = await ethers.getContractFactory("AdminBox");
    console.log("Deploying AdminBox...");
    const adminBox = await upgrades.deployProxy(
        AdminBox,
        ["insert proxy address here"],
        { initializer: "initialize" }
    );
    await adminBox.deployed();
    console.log("AdminBox deployed to:", adminBox.address);
}

main();
