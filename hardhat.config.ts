import { HardhatUserConfig } from "hardhat/types";

import '@typechain/hardhat'
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "hardhat-deploy";
import "hardhat-tracer";
import "solidity-coverage";
import { task } from "hardhat/config";

// make sure to set your .env file
const { config } = require("dotenv");
config();

const INFURA_ID = process.env.INFURA_API_KEY;
const OWNER_PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html

task(
  "accounts", "Prints the list of accounts", async (_, { ethers }) => {
    const accounts = await ethers.getSigners();
    for (const account of accounts) {
      console.log(account.address);
    }
  }
);

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

// const gasPrice = 50000000000; // 50 GWEI
const gasPrice =    25000000000; // 25 GWEI
// const gasLimit = 12450000; // mainnet
const gasLimit = 9500000;  // rinkeby

module.exports = {
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },
  networks: {
    forking: {
      url: "https://eth-mainnet.alchemyapi.io/v2/<key>"
    },
    hardhat: {
      blockGasLimit: gasLimit,
      gasPrice: gasPrice
    },
    localhost: {
      url: 'http://localhost:8545',
      chainId: 31337,
      gasPrice: gasPrice
    },
    ganache: {
      url: 'http://localhost:7545',
      chainId: 1337,
      gasPrice: gasPrice
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_ID}`,
      accounts: [OWNER_PRIVATE_KEY],
      chainId: 1,
      gasPrice: gasPrice
    },
    rinkeby: {
      // url: `https://rinkeby.infura.io/v3/${INFURA_ID}`,
      url: `https://rinkeby.nowlive.ro/`,
      accounts: [OWNER_PRIVATE_KEY],
      chainId: 4,
      gasPrice: gasPrice
    },
    kovan: {
      url: `https://kovan.infura.io/v3/${INFURA_ID}`,
      accounts: [OWNER_PRIVATE_KEY],
      chainId: 42,
      gasPrice: gasPrice
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    // url: "https://api-rinkeby.etherscan.io/",
    url: "https://api.etherscan.io/",
    apiKey: ETHERSCAN_API_KEY,
  },
  solidity: {
    version: "0.7.5",
    compilers: [
      { version: "0.6.0", settings: {} },
      { version: "0.6.6", settings: {} },
      { version: "0.7.5", settings: {} },
      { version: "0.8.0", settings: {} }
    ],
    settings: {
      optimizer: {
        enabled: false,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./tests",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 100000
  }
};
