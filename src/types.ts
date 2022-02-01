import { AlchemyWeb3 } from '@alch/alchemy-web3';

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
