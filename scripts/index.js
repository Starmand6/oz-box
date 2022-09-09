const { ethers } = require("hardhat");

// scripts/index.js
async function main() {
    //Retrieve accounts from the local node
    const accounts = await ethers.provider.listAccounts();
    console.log(accounts);
    const address = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    const Box = await ethers.getContractFactory("Box");
    const box = await Box.attach(address);

    // Send a transaction to store() a new value in the Box
    await box.store(23);
    console.log("Stored value has been changed to 23.");

    // Call the retrieve() function of the deployed Box contract
    const value = await box.retrieve();
    console.log("The current value stored in the Box is", value.toString());
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
