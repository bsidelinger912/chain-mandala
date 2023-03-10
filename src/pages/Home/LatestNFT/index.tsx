/**
 * @class LatestNFT
 * @description
 */

import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import { useQuery, gql } from '@apollo/client';

import CenteredLoader from '../../../components/CenteredLoader';
import MandalaModal from '../../../components/MandalaModal';
import { extractMetaData } from '../../../util';

type Token = {
  tokenId: string;
  tokenURI: string;
  owner: string;
};

type TokensQuery = {
  tokens: Token[];
}

const GET_TOKENS = gql`
  query LatestTokenQuery {
    tokens {
      tokenId
      tokenURI
      owner
    }
  }
`;

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
  const [modalOpen, setModalOpen] = useState(false);
  const { data: gqlData } = useQuery<TokensQuery>(GET_TOKENS);

  if (!gqlData) {
    return <CenteredLoader />;
  }

  if (gqlData.tokens.length === 0) {
    return <Typography>Be the first to mint!</Typography>;
  }

  const latestToken = gqlData.tokens.reduce<Token>((acc, token) => {
    if (parseInt(token.tokenId, 10) > parseInt(acc.tokenId, 10)) {
      return token;
    }

    return acc;
  }, gqlData.tokens[0]);

  const metaData = extractMetaData(latestToken.tokenURI);
  const tokenId = parseInt(latestToken.tokenId, 10);

  return (
    <Wrapper>
      <Typography variant="h4">Latest Mandala</Typography>
      <Image onClick={() => setModalOpen(true)} alt={`OnChainNFT # ${tokenId}`} src={metaData.image} />
      {modalOpen && <MandalaModal metaData={metaData} tokenId={tokenId} owner={latestToken.owner} onClose={() => setModalOpen(false)} />}
    </Wrapper>
  );
};

export default LatestNFT;
