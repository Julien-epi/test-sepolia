require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

const ALCHEMY_API_KEY = "eUX7OcZJPLt1MFo6uAuc-_aDQNRaRCsk";

const SEPOLIA_PRIVATE_KEY = "02a77de17d85c3e3fd3784f0770bebd8232c9a9c9592592dcec7e1ff53abeb0d";

const ETHERSCAN_API_KEY = "112S5291PA1R68WXDA9KXM1YT5WF6J64FV";

module.exports = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
      chainId: 11155111,
    },
  },
};
