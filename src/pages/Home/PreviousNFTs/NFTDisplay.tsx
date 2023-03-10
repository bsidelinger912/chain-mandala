/**
 * @class NFTDisplay
 * @description
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../../auth/AuthProvider';

import { PrevNFTWithTokenId } from '../../../types';
import MandalaModal from '../../../components/MandalaModal';

export type Props = PrevNFTWithTokenId;

type WrapperProps = {
  ownedByUser: boolean;
}

const ownerHighlightColor = '#fff8ba';

const Wrapper = styled.div<WrapperProps>`
  cursor: pointer;
  border: 1px solid transparent;
  box-shadow: ${(props) => (props.ownedByUser ? `0 0 5px ${ownerHighlightColor}` : 'none')};

  &:hover {
    border-color: #ccc;
  }
`;

const NFTDisplay: React.FC<Props> = ({ metaData, tokenId, owner }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const { account } = useAuth();
  const ownedByUser = !!(account && account === owner);

  return (
    <>
      <Wrapper onClick={() => setModalOpen(true)} ownedByUser={ownedByUser}>
        <img alt={`OnChainNFT # ${tokenId}`} src={metaData.image} />
      </Wrapper>
      {modalOpen && <MandalaModal metaData={metaData} tokenId={tokenId} owner={owner} onClose={() => setModalOpen(false)} />}
    </>
  );
};

export default NFTDisplay;
