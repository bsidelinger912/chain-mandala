/**
 * @class PreviousNFTs
 * @description
 */

import React from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';

import CenteredLoader from '../../../components/CenteredLoader';
import NFTDisplay from './NFTDisplay';
import usePreviousNFTs from '../../../chainData/usePreviousNFTs';

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
  const { data } = usePreviousNFTs(20, 1);

  return (
    <Wrapper>
      <Typography variant="subtitle1">Previous Mandalas</Typography>
      <ListWrapper>
        {!data ? <CenteredLoader /> : (
          <>
            {data.map((tokenInfo) => <Item key={tokenInfo.tokenId}><NFTDisplay metaData={tokenInfo.metaData} tokenId={tokenInfo.tokenId} /></Item>)}
          </>
        )}
      </ListWrapper>
    </Wrapper>
  );
};

export default PreviousNFTs;
