import { WindowWithWeb3 } from '../types';

// eslint-disable-next-line @typescript-eslint/no-var-requires, import/extensions
const contract = require('../OnChainNFT.json');

export const web3 = (window as unknown as WindowWithWeb3).AlchemyWeb3.createAlchemyWeb3(process.env.API_URL as string);
// const oldcontractAddress = '0x8272a54660b9ffb18d93e591d2d88c4e7ef27cd5';
const newContractAddress = process.env.CONTRACT_ADDRESS;

export const nftContract = new web3.eth.Contract(contract.abi, newContractAddress);
export const contractAddress = newContractAddress;
