/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const { ethers, upgrades } = require('hardhat');

async function main() {
  const MyNFT = await ethers.getContractFactory('OnChainNFT');

  // Start deployment, returning a promise that resolves to a contract object
  // const myNFT = await MyNFT.deploy();
  const myNFT = await upgrades.deployProxy(MyNFT);
  console.log('Contract deployed to address:', myNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
