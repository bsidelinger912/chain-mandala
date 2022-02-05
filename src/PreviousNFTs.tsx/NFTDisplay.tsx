/**
 * @class NFTDisplay
 * @description
 */

import React from 'react';

import { NFTMetaData } from '../types';

export interface Props {
  metaData: NFTMetaData;
  tokenId: number;
}

const NFTDisplay: React.FC<Props> = ({ metaData, tokenId }) => (
  <div>
    <img alt={`OnChainNFT # ${tokenId}`} src={metaData.image} />
  </div>
);

export default NFTDisplay;
