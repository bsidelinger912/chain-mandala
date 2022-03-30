/**
 * @class PreviousNFTs
 * @description
 */

import React from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';

import CenteredLoader from '../../../components/CenteredLoader';
import NFTDisplay from './NFTDisplay';
import { singleColumnWidth } from '../../../cssConstants';
import { useChainData } from '../../../chainData/Provider';

const Wrapper = styled.div`
  margin-top: 30px;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 200px;
  margin: 0 -10px;
`;

const Item = styled.div`
  width: calc(25% - 20px);
  box-sizing: border-box;
  margin: 10px;

  @media (max-width: ${singleColumnWidth}) {
    width: calc(50% - 20px);
  }
`;

const PreviousNFTs: React.FC = () => {
  const { data } = useChainData();

  return (
    <Wrapper>
      <Typography variant="subtitle1">Previous Mandalas</Typography>
      <ListWrapper>
        {!data ? <CenteredLoader /> : (
          <>
            {data.slice(1).map((tokenInfo) => (
              <Item key={tokenInfo.tokenId}>
                <NFTDisplay metaData={tokenInfo.metaData} tokenId={tokenInfo.tokenId} owner={tokenInfo.owner} />
              </Item>
            ))}
          </>
        )}
      </ListWrapper>
    </Wrapper>
  );
};

export default PreviousNFTs;
