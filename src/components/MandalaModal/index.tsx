/**
 * @class MandalaModal
 * @description
 */

import React from 'react';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';

import { PrevNFTWithTokenId } from '../../chainData/Provider';
import Attribute from './Attribute';

export type Props = PrevNFTWithTokenId & {
  onClose: () => void;
}

const imageHeight = '90vh';
const infoWidth = '270px';

const ContentWrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  height: ${imageHeight};
  width: calc(${imageHeight} + ${infoWidth});
  margin: 5vh auto 0;
  background-color: #282c34;
  color: white;
  border: 1px solid white;
  border-radius: 5px;
  outline: none;
`;

const ImageWrapper = styled.div`
  height: ${imageHeight};
  width: ${imageHeight};
  border-right: 1px solid white;
`;

const InfoWrapper = styled.div`
  box-sizing: border-box;
  padding: 15px;
  width: ${infoWidth};
`;

const CloseButtonWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
`;

const MandalaModal: React.FC<Props> = ({
  metaData, tokenId, onClose, owner,
}) => (
  <Modal open onClose={onClose} onBackdropClick={onClose}>
    <ContentWrapper>
      <CloseButtonWrapper>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </CloseButtonWrapper>
      <ImageWrapper>
        <img alt={`OnChainNFT # ${tokenId}`} src={metaData.image} />
      </ImageWrapper>
      <InfoWrapper>
        <Attribute name="Token ID" value={tokenId.toString()} />
        <Attribute name="Owner" value={`${owner.substr(0, 20)}...`} />
        {metaData.attributes.map((attribute) => (
          <Attribute name={attribute.trait_type} key={attribute.trait_type} value={attribute.value} />
        ))}
      </InfoWrapper>
    </ContentWrapper>
  </Modal>
);

export default MandalaModal;
