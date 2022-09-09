/** @type import('hardhat/config').HardhatUserConfig */
require("dotenv").config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-truffle5");
require("@openzeppelin/hardhat-upgrades");

//const { GOERLI_RPC_URL, mnemonic } = require("dotenv").config();
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const mnemonic = process.env.mnemonic;

module.exports = {
    solidity: "0.8.9",
    networks: {
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: { mnemonic: mnemonic }, //Account[0]: 0x794a4c92eef32ac6228f6cc1b1a868ec46d33964 has 0.02 ETH.
            chainId: 5,
            blockConfirmations: 6,
        },
    },
};
