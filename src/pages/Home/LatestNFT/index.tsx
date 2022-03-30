/**
 * @class LatestNFT
 * @description
 */

import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

import CenteredLoader from '../../../components/CenteredLoader';
import MandalaModal from '../../../components/MandalaModal';
import { useChainData } from '../../../chainData/Provider';

const Wrapper = styled.div`
  border: 1px solid white;
  padding: 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    border-color: #ccc;
  }
`;

const Image = styled.img`
  width: 100%;
`;

const LatestNFT: React.FC = () => {
  const { data } = useChainData();
  const [modalOpen, setModalOpen] = useState(false);

  if (!data) {
    return <CenteredLoader />;
  }

  if (data.length === 0) {
    return <Typography>Be the first to mint!</Typography>;
  }

  const { metaData, tokenId, owner } = data[0];

  return (
    <Wrapper>
      <Typography variant="h4">Latest Mandala</Typography>
      <Image onClick={() => setModalOpen(true)} alt={`OnChainNFT # ${data[0].tokenId}`} src={data[0].metaData.image} />
      {modalOpen && <MandalaModal metaData={metaData} tokenId={tokenId} owner={owner} onClose={() => setModalOpen(false)} />}
    </Wrapper>
  );
};

export default LatestNFT;
