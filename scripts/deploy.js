// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

async function main() {
  // const initialAmount = hre.ethers.utils.parseEther("0.001");

  const CoinFlip = await hre.ethers.getContractFactory("CoinFlip");

  const contract = await CoinFlip.deploy();

  await contract.deployed();
  console.log(`CoinFlip deployed to:, ${contract.address}`);

  await sleep(45 * 1000);

  await hre.run("verify:verify", {
    address: contract.address,
    constructorArguments: [],
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
