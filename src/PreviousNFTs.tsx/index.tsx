/**
 * @class PreviousNFTs
 * @description
 */

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';

import CenteredLoader from '../components/CenteredLoader';
import { NFTMetaData } from '../types';
import { nftContract } from '../web3';
import NFTDisplay from './NFTDisplay';

interface PrevNFTWithTokenId {
  metaData: NFTMetaData;
  tokenId: number;
}

const Wrapper = styled.div`
  margin-top: 30px;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 200px;
`;

const Item = styled.div`
  width: 200px;
  padding: 10px;
`;

const PreviousNFTs: React.FC = () => {
  const [prevNFTs, setPrevNFTS] = useState<PrevNFTWithTokenId[]>([]);

  const findNFTs = async (): Promise<void> => {
    try {
      const latestToken = await nftContract.methods.getLatestTokenId().call();
      const latestTokenNumber = parseInt(latestToken, 10);

      const promises = [];

      for (let i = 1; i <= latestTokenNumber; i++) {
        promises.push(nftContract.methods.tokenURI(i).call());
      }

      const results: string[] = await Promise.all(promises);

      const metaData = results.map((result, index) => {
        const encoded = result.split(';base64,')[1];
        const json = atob(encoded);
        return {
          metaData: JSON.parse(json),
          tokenId: index + 1,
        } as PrevNFTWithTokenId;
      });

      setPrevNFTS(metaData);
    } catch (e) {
      console.log('error getting previous NFTs:', e);
    }
  };

  useEffect(() => {
    findNFTs();
  }, []);

  return (
    <Wrapper>
      <Typography variant="subtitle1">Previously minted NFTs</Typography>
      <ListWrapper>
        {(prevNFTs.length < 1) ? <CenteredLoader /> : null}
        {prevNFTs.map((tokenInfo) => <Item key={tokenInfo.tokenId}><NFTDisplay metaData={tokenInfo.metaData} tokenId={tokenInfo.tokenId} /></Item>)}
      </ListWrapper>
    </Wrapper>
  );
};

export default PreviousNFTs;
