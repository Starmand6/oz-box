<a name="readme-top"></a>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#development-stack-and-plugins">Development Stack and Plugins</a></li>
    <li><a href="#cli-and-interaction-steps">CLI and Interaction Steps</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

### About The Project

OpenZeppelin Tutorial for developing, deploying, testing, and upgrading a smart contract that stores one single, little, tiny, meaningless number in a contract on the blockchain.

I'm using this tutorial to solidify concepts for myself, as practice in creating a comprehensive README template, as well as practice pushing to Github.

<!-- GETTING STARTED -->

### Development Stack and Plugins

-   Your favorite Linux distribution and development environment (I currently use Ubuntu and VS Code, respectively)
-   git (code version control)
-   Nodejs (open-source, cross-platform, back-end JavaScript runtime environment)
-   npm (open-source, online repository; package manager and CLI utility for interacting with repo)
-   Hardhat (local Eth env. for testing, debugging, compiling, and deploying contracts)
-   OpenZeppelin contracts (super sweet battle-tested code)
-   Hardhat ethers.js plugin (for interacting with the Ethereum blockchain)
-   Hardhat local node and console (to interact with contracts)
-   Chai (for testing)
-   OpenZeppelin Test Helpers library (Truffle plugin for Hardhat)
-   Alchemy to connect to Goerli testnet (Alchemy is a platform that generates APIs and offers scure connections to the Blockchain)
-   OpenZeppelin Upgrades Plugins (to deploy upgradeable contracts)

### CLI and Interaction Steps

0. Clone the repo
    ```sh
    git clone https://github.com/Starmand6/oz-box.git
    ```
1. Install Node Version Manager (nvm), Node.js, and Node Package Manger (npm)

    - nvm: https://github.com/nvm-sh/nvm
      (`nvm install node` installs latest vesion of Node.js.)
    - npm:
        ```sh
        npm install npm@latest -g
        ```

2. Initialize and Setup Project

    ```sh
    cd oz-box
    git init
    npm install --save-dev hardhat
    npx hardhat
    ```

3. Install Dependencies

    ```sh
    npm install --save-dev @openzeppelin/contracts
    npx install --save-dev chai
    npm install --save-dev @nomiclabs/hardhat-truffle5 @nomiclabs/hardhat-web3 web3
    npm install --save-dev @openzeppelin/test-helpers
    npm install --save-dev @openzeppelin/hardhat-upgrades
    ```

    - Install and populate package.json dependencies.
    - Create folders: contracts, deploy, tests, scripts, utils.
    - Configure hardhat.config file.

4. Coding, Deploying, and Testing on Local Blockchain

    - Code and compile (see repo and/or OZ tutorial for contracts, scripts, and tests).
    - Run local blockchain node.
    - Use scripts to deploy contracts since Hardhat does not have a native deployment feature.
    - Interact with contracts with Hardhat console.
    - Test with Chai and OZ Test Helpers (w/ plugins installed in step #3)

    ```sh
    npx hardhat compile
    npx hardhat node
    npx hardhat run --network localhost scripts/deploy.js
    npx hardhat console --network localhost
    npx hardhat test
    ```

5. Deploying and Testing on Public Testnet (Goerli)

    - Access testnet node via Alchemy
        - Get a free API Key at [https://alchemy.com](https://alchemy.com)
        - Enter your API Key in `dotenv`
            ```js
            const ALCHEMY_API_KEY = "ENTER YOUR API";
            ```
    - Create new eth testnet accounts:
        ```sh
        npx mnemonics
        ```
    - Update `hardhat.config` and `dotenv` file:

        ```js
        // hardhat.config.js
        const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
        const mnemonic = process.env.mnemonic;

        module.exports = {
            solidity: "0.8.9",
            networks: {
                goerli: {
                    url: GOERLI_RPC_URL,
                    accounts: { mnemonic: mnemonic },
                    chainId: 5,
                    blockConfirmations: 6,
                },
            },
        };
        ```

        `dotenv` file:

        ```
        ALCHEMY_API_KEY = "Your API Key"
        mnemonic = your mnemonic here
        GOERLI_RPC_URL = Goerli RPC with Alchemy Key URL
        ```

    - Fill one account with Goerli testnet Eth:
        - Use your developlment MetaMask wallet to get testnet Eth from https://goerlifaucet.com
        - Send Eth from MetaMask wallet to one of the newly created accounts from the mnemonic.
    - Deploy to Goerli testnet (access testnet node via Alchemy):
        ```sh
        npx hardhat compile
        npx hardhat node
        npx hardhat run --network goerli scripts/deploy.js
        npx hardhat console --network goerli
        npx hardhat test
        ```

6. Upgrading smart contracts (via Proxy; dependency already installed in step #3):

    - Use same CLI commands as above, but we need to deploy the new upgradeable Box contract, as well as the ProxyAdmin and proxy contracts.
    - As an example, we create a new `BoxV2` contract with a new incrementing function, create a script to upgrade the previous contract to now use `BoxV2`, then deploy the upgrade (see repo and/or OZ tutorial for contracts, scripts, and tests).
        ```sh
        npx hardhat compile
        npx hardhat node
        npx hardhat run --network localhost scripts/deploy_upgradeable_box.js
        npx hardhat console --network localhost
        npx hardhat test
        npx hardhat run --network localhost scripts/upgrade_box.js
        ```
    - From here, we can use the console to test if the upgrade worked by calling the `increment()` function.

7. Preparing for mainnet:
    - I did not deploy the contracts to mainnet, so this part of the tutorial is not in the repo. Go to https://docs.openzeppelin.com/learn/preparing-for-mainnet to see how it's done.

### Usage Notes

The OpenZeppelin (OZ) "Box" tutorial uses Hardhat testing, as well as a special OZ Test Helpers plugin that you need a Hardhat Truffle plugin for. As such, there are two test files. Using `npm hardhat test` runs all files in the test folder, thus both tests are run. `Box.hardhatversion.test` is the first test in the OZ tutorial. `Box.test` is the second test and uses the OZ Test Helpers plugin. It is also used to test the upgradeable "V2" version of the Box contract. Since that version removed the "Ownable" import/aspect, that code section of the `Box.test` file has been commented out.

There is also a testing error with `Box.test` that I haven't figured out. I tried to add a test to ensure the contract upgrade works, but things are getting squirrely in my brain with Truffle and Hardhat crossing streams. The error:

```
1. Contract: Box
   works before and after upgrading:
   TypeError: Cannot read properties of undefined (reading 'encodeDeploy')
   at getDeployData (node_modules/@openzeppelin/hardhat-upgrades/src/utils/deploy-impl.ts:49:45)
   at deployProxyImpl (node_modules/@openzeppelin/hardhat-upgrades/src/utils/deploy-impl.ts:72:22)
   at Proxy.deployProxy (node_modules/@openzeppelin/hardhat-upgrades/src/deploy-proxy.ts:35:28)
   at Context.<anonymous> (test/Box.test.js:50:26)

```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

Not Used for this repo.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Not Used for this repo.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Armand Daigle - [@\_Starmand](https://twitter.com/_Starmand) - armanddaoist@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments and Resources

OpenZeppelin is an incredible resource for Ethereum development. Every single section in their documents website is useful. Their Learn guides are particularly crucial for any beginners getting an overall feel for Ethereum back-end development. I've learned a ton from them. Thanks OZ!

https://docs.openzeppelin.com/

<p align="right">(<a href="#readme-top">back to top</a>)</p>
