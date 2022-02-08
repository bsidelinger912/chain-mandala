/**
 * @class MandalaModal
 * @description
 */

import React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import styled from 'styled-components';

import { PrevNFTWithTokenId } from '../../chainData/Provider';
import ScanLink from '../ScanLink';

export type Props = PrevNFTWithTokenId & {
  onClose: () => void;
}

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 20px auto 0;
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  outline: none;
`;

const InfoWrapper = styled.div`
  padding: 15px;
`;

const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const AttributesList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Attribute = styled.span`
  margin: 10px;
  border: 1px solid white;
  border-radius: 5px;
  padding: 10px;
`;

const MandalaModal: React.FC<Props> = ({
  metaData, tokenId, onClose, owner,
}) => (
  <Modal open onClose={onClose} onBackdropClick={onClose}>
    <ContentWrapper>
      <div>
        <img alt={`OnChainNFT # ${tokenId}`} src={metaData.image} />
      </div>
      <InfoWrapper>
        <LinkWrapper>
          <Typography>Owner:</Typography>
          <ScanLink hash={owner} />
        </LinkWrapper>
        <AttributesList>
          {metaData.attributes.map((attribute) => (
            <Attribute>
              <Typography>{`${attribute.trait_type}: `}</Typography>
              <Chip label={attribute.value as string} />
            </Attribute>
          ))}
        </AttributesList>
      </InfoWrapper>
    </ContentWrapper>
  </Modal>
);

export default MandalaModal;
