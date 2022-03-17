import { AlchemyWeb3 } from '@alch/alchemy-web3';
// eslint-disable-next-line import/no-extraneous-dependencies
import { TransactionConfig as TransactionConfigCore } from 'web3-core';

export type WindowWithWeb3 = {
  AlchemyWeb3: {
    createAlchemyWeb3: (url: string) => AlchemyWeb3
  }
}

export type Trait = {
  trait_type: string;
  value: string;
};

export type NFTMetaData = {
  attributes: Trait[];
  image: string;
}

export type TransactionConfig = TransactionConfigCore & {
  maxPriorityFeePerGas?: string;
};
