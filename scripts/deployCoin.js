/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const { ethers } = require('hardhat');

async function main() {
  const MyCoin = await ethers.getContractFactory('MandalaCoin');

  // Start deployment, returning a promise that resolves to a contract object
  const myCoin = await MyCoin.deploy();

  console.log('Token deployed to address:', myCoin.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
