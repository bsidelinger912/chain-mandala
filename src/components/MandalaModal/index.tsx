/**
 * @class MandalaModal
 * @description
 */

import React from 'react';
import styled from 'styled-components';

import { PrevNFTWithTokenId } from '../../types';
import Attribute from './Attribute';
import { useAuth } from '../../auth/AuthProvider';
import Modal from '../Modal';
import { singleColumnWidth } from '../../cssConstants';

export type Props = PrevNFTWithTokenId & {
  onClose: () => void;
}

const imageHeight = '90vh';
const infoWidth = '270px';

const ContentWrapper = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: row;
  
  @media (max-width: ${singleColumnWidth}) {
    flex-direction: column;
    width: 100%;
  }
`;

const ImageWrapper = styled.div`
  height: ${imageHeight};
  width: ${imageHeight};
  border-right: 1px solid white;

  @media (max-width: ${singleColumnWidth}) {
    border: none;
    width: 100%;
    height: auto;
  }
`;

const InfoWrapper = styled.div`
  box-sizing: border-box;
  padding: 15px;
  width: ${infoWidth};

  @media (max-width: ${singleColumnWidth}) {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
`;

const MandalaModal: React.FC<Props> = ({
  metaData, tokenId, onClose, owner,
}) => {
  const { account } = useAuth();
  const ownerText = account && account === owner ? 'Congrats, You own this Mandala' : owner;

  return (
    <Modal open onClose={onClose}>
      <ContentWrapper>
        <ImageWrapper>
          <img alt={`OnChainNFT # ${tokenId}`} src={metaData.image} />
        </ImageWrapper>
        <InfoWrapper>
          <Attribute name="Token ID" value={tokenId.toString()} />
          <Attribute name="Owner" value={ownerText} />
          {metaData.attributes.map((attribute) => (
            <Attribute name={attribute.trait_type} key={attribute.trait_type} value={attribute.value} />
          ))}
        </InfoWrapper>
      </ContentWrapper>
    </Modal>
  );
};

export default MandalaModal;
