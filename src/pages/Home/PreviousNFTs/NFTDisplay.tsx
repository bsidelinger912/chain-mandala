/**
 * @class NFTDisplay
 * @description
 */

import React, { useState } from 'react';
import styled from 'styled-components';

import { PrevNFTWithTokenId } from '../../../chainData/Provider';
import MandalaModal from '../../../components/MandalaModal';

export type Props = PrevNFTWithTokenId;

const Wrapper = styled.div`
  cursor: pointer;
`;

const NFTDisplay: React.FC<Props> = ({ metaData, tokenId, owner }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Wrapper onClick={() => setModalOpen(true)}>
      <img alt={`OnChainNFT # ${tokenId}`} src={metaData.image} />
      {modalOpen && <MandalaModal metaData={metaData} tokenId={tokenId} owner={owner} onClose={() => setModalOpen(false)} />}
    </Wrapper>
  );
};

export default NFTDisplay;
