/**
 * @class ChainDataProvider
 * @description
 */

import React, {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { NFTMetaData } from '../types';
import { nftContract } from '../web3';

export interface PrevNFTWithTokenId {
  metaData: NFTMetaData;
  tokenId: number;
  owner: string;
}

export interface ChainDataContext {
  latestTokenId?: number;
  getPreviousNFTs: (numberOfNFTs: number, offset?: number) => Promise<PrevNFTWithTokenId[]>;
}

interface TokenQueries {
  tokenUri: string;
  owner: string;
  tokenId: number;
}

const ctx = createContext<ChainDataContext>({} as ChainDataContext);

export const useChainData = (): ChainDataContext => useContext(ctx);

const getTokenUriAndOwner = async (tokenId: number): Promise<TokenQueries> => {
  const [tokenUri, owner] = await Promise.all([nftContract.methods.tokenURI(tokenId).call(), nftContract.methods.ownerOf(tokenId).call()]);

  return { tokenId, tokenUri, owner };
};

const ChainDataProvider: React.FC = ({ children }) => {
  const [latestTokenId, setLatestTokenId] = useState<number>();

  const getTokenCount = async (): Promise<number> => {
    const latestToken = await nftContract.methods.getLatestTokenId().call();
    const latestTokenNumber = parseInt(latestToken, 10);
    setLatestTokenId(latestTokenNumber);
    return latestTokenNumber;
  };

  useEffect(() => {
    getTokenCount();
  }, []);

  const getPreviousNFTs = useCallback(async (numberOfNFTs: number, offset?: number) => {
    const latestTokenNumber = await getTokenCount();

    const promises = [];

    const startNumber = typeof offset === 'undefined' ? latestTokenNumber : latestTokenNumber - offset;
    const endNumber = Math.max(1, startNumber - numberOfNFTs);

    for (let i = startNumber; i >= endNumber; i--) {
      promises.push(getTokenUriAndOwner(i));
    }

    const results: TokenQueries[] = await Promise.all(promises);

    return results.map((result, index) => {
      const encoded = result.tokenUri.split(';base64,')[1];
      const json = atob(encoded);
      return {
        metaData: JSON.parse(json),
        tokenId: index + 1,
        owner: result.owner,
      } as PrevNFTWithTokenId;
    });
  }, [latestTokenId]);

  const value = useMemo<ChainDataContext>(() => ({
    latestTokenId,
    getPreviousNFTs,
  }), [getPreviousNFTs, latestTokenId]);

  return (
    <ctx.Provider value={value}>{children}</ctx.Provider>
  );
};

export default ChainDataProvider;
