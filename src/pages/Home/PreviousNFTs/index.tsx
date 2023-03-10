/**
 * @class PreviousNFTs
 * @description
 */

import React from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import { useQuery, gql } from '@apollo/client';

import CenteredLoader from '../../../components/CenteredLoader';
import NFTDisplay from './NFTDisplay';
import { singleColumnWidth } from '../../../cssConstants';
import { extractMetaData } from '../../../util';

type Token = {
  tokenId: string;
  tokenURI: string;
  owner: string;
};

type TokensQuery = {
  tokens: Token[];
}

const Wrapper = styled.div`
  margin-top: 30px;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: 200px;
  margin: 0 -10px;
`;

const Item = styled.div`
  width: calc(25% - 20px);
  box-sizing: border-box;
  margin: 10px;

  @media (max-width: ${singleColumnWidth}) {
    width: calc(50% - 20px);
  }
`;

const GET_TOKENS = gql`
  query PreviousTokensQuery {
    tokens {
      tokenId
      tokenURI
      owner
    }
  }
`;

const PreviousNFTs: React.FC = () => {
  const { data: gqlData } = useQuery<TokensQuery>(GET_TOKENS);

  return (
    <Wrapper>
      <Typography variant="subtitle1">Previous Mandalas</Typography>
      <ListWrapper>
        {!gqlData ? <CenteredLoader /> : (
          <>
            {gqlData.tokens.slice(1).map((token) => {
              const metadata = extractMetaData(token.tokenURI);

              return (
                <Item key={token.tokenId}>
                  <NFTDisplay metaData={metadata} tokenId={parseInt(token.tokenId, 10)} owner={token.owner} />
                </Item>
              );
            })}
          </>
        )}
      </ListWrapper>
    </Wrapper>
  );
};

export default PreviousNFTs;
