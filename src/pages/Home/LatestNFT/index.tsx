/**
 * @class LatestNFT
 * @description
 */

import React from 'react';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

import usePreviousNFTs from '../../../chainData/usePreviousNFTs';
import CenteredLoader from '../../../components/CenteredLoader';

const Wrapper = styled.div`
  border: 1px solid white;
  padding: 20px;
  border-radius: 5px;
`;

const Image = styled.img`
  width: 100%;
`;

const LatestNFT: React.FC = () => {
  const { data } = usePreviousNFTs(1);

  if (!data) {
    return <CenteredLoader />;
  }

  if (data.length === 0) {
    return <Typography>Be the first to mint!</Typography>;
  }

  return (
    <Wrapper>
      <Typography variant="h4">Latest Mandala</Typography>
      <Image alt={`OnChainNFT # ${data[0].tokenId}`} src={data[0].metaData.image} />
    </Wrapper>
  );
};

export default LatestNFT;
