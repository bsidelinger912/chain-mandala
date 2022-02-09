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
  border: 1px solid transparent;

  &:hover {
    border-color: #ccc;
  }
`;

const NFTDisplay: React.FC<Props> = ({ metaData, tokenId, owner }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Wrapper onClick={() => setModalOpen(true)}>
        <img alt={`OnChainNFT # ${tokenId}`} src={metaData.image} />
      </Wrapper>
      {modalOpen && <MandalaModal metaData={metaData} tokenId={tokenId} owner={owner} onClose={() => setModalOpen(false)} />}
    </>
  );
};

export default NFTDisplay;
