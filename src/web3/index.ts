import { AlchemyEth, AlchemyWeb3 } from '@alch/alchemy-web3';
import config from '../config';
import { WindowWithWeb3 } from '../types';

// eslint-disable-next-line @typescript-eslint/no-var-requires, import/extensions
const contract = require('../OnChainNFT.json');

// eslint-disable-next-line @typescript-eslint/no-var-requires, import/extensions
const tokenContractData = require('../MandalaCoin.json');

type Eth = AlchemyEth & {
  getMaxPriorityFeePerGas: () => Promise<string>;
}

type Web3 = AlchemyWeb3 & {
  eth: Eth;
}

export const web3 = (window as unknown as WindowWithWeb3).AlchemyWeb3.createAlchemyWeb3(config.apiUrl) as Web3;

export const { contractAddress } = config;
export const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

export const tokenContract = new web3.eth.Contract(tokenContractData.abi, config.tokenAddress);
