/**
 * @class MintNFT
 * @description
 */

import React from 'react';

export interface Props {
  metaDataUri?: string;
}

const MintNFT: React.FC<Props> = ({ metaDataUri }) => {
  const mint = (): void => {
    console.log(metaDataUri);
  };

  return (
    <button type="button" onClick={mint} disabled={!metaDataUri}>Mint NFT</button>
  );
};

export default MintNFT;
