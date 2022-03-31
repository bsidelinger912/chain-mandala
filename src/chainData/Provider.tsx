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
  loading: boolean;
  data?: PrevNFTWithTokenId[];
  error?: string;
  reload: () => void;
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
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PrevNFTWithTokenId[]>();
  const [error, setError] = useState<string>();

  const getTokenCount = async (): Promise<number> => {
    const latestToken = await nftContract.methods.getLatestTokenId().call();
    const latestTokenNumber = parseInt(latestToken, 10);
    setLatestTokenId(latestTokenNumber);
    return latestTokenNumber;
  };

  const getPreviousNFTs = useCallback(async (numberOfNFTs: number, offset?: number) => {
    const latestTokenNumber = await getTokenCount();

    const promises = [];

    const startNumber = typeof offset === 'undefined' ? latestTokenNumber : latestTokenNumber - offset;
    const endNumber = Math.max(0, startNumber - numberOfNFTs);

    for (let i = startNumber; i > endNumber; i--) {
      promises.push(getTokenUriAndOwner(i));
    }

    const results: TokenQueries[] = await Promise.all(promises);

    const mappedResults = results.map((result, index) => {
      const encoded = result.tokenUri.split(';base64,')[1];
      const json = atob(encoded);
      return {
        metaData: JSON.parse(json),
        tokenId: latestTokenNumber - index - (offset || 0),
        owner: result.owner,
      } as PrevNFTWithTokenId;
    });
    setData((d) => mappedResults.concat(d || []));
  }, []);

  const reload = useCallback(async () => {
    setLoading(true);

    try {
      const prevTokenCount = latestTokenId || 0;
      const newTokenCount = await getTokenCount();
      const newTokens = newTokenCount - prevTokenCount;

      getPreviousNFTs(newTokens);
    } catch (e: any) {
      setError(e.message);
    }
  }, [getPreviousNFTs, latestTokenId]);

  useEffect(() => {
    getTokenCount();

    try {
      getPreviousNFTs(50);
    } catch (e: any) {
      setError(e.message);
    }
  }, [getPreviousNFTs]);

  const value = useMemo<ChainDataContext>(() => ({
    latestTokenId,
    data,
    loading,
    error,
    reload,
  }), [latestTokenId, data, loading, error, reload]);

  return (
    <ctx.Provider value={value}>{children}</ctx.Provider>
  );
};

export default ChainDataProvider;
