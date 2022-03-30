/**
 * @class Home
 * @description
 */

import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import MuiLink from '@mui/material/Link';

import LatestNFT from './LatestNFT';
import PreviousNFTs from './PreviousNFTs';
import config from '../../config';
import { singleColumnWidth } from '../../cssConstants';
import LogoLink from './LogoLink';

interface Props {
  onMintButtonClick: () => void;
}

const TopRow = styled.div`
  display: flex;

  @media (max-width: ${singleColumnWidth}) {
    flex-direction: column;
  }
`;

const LatestNFTHolder = styled.div`
  width: 50%;
  margin-right: 20px;

  @media (max-width: ${singleColumnWidth}) {
    width: 100%;
    margin: 0;
  }
`;

const BlurbHolder = styled.div`
  width: 50%;

  @media (max-width: ${singleColumnWidth}) {
    width: 100%;
    margin-top: 20px;
  }
`;

const BlurbHeader = styled(Typography)`
  margin-top: 0px;
`;

const LinkHeader = styled(Typography)`
  margin-top: 30px;
`;

const MintButton = styled(Button)`
  margin: 10px 0;
`;

const ContractLink = styled(MuiLink)`
  display: flex;
  align-items: center;
`;

const ContractAddress = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-right: 5px;
`;

const LogoLinks = styled.div`
  display: flex;
  align-items: center;
`;

const Home: React.FC<Props> = ({ onMintButtonClick }) => (
  <div>
    <TopRow>
      <LatestNFTHolder>
        <LatestNFT />
      </LatestNFTHolder>

      <BlurbHolder>
        <BlurbHeader variant="h5">About the project</BlurbHeader>
        <p>
          Welcome to On-Chain Mandala, a fully on-chain NFT project which allows you to generate the art yourself.
          You can generate as many Mandala&apos;s as you want and only mint when you get one you love.  You need a
          MDLA token to be able to mint a Mandala. Likely you got here because you&apos;ve been given a token, if not you
          can check back here later as we may provide additional ways to get a MDLA token.
        </p>

        <MintButton
          size="large"
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            onMintButtonClick();
          }}
        >
          I have some MDLA token, lets mint!
        </MintButton>

        <div>
          <LinkHeader variant="h6">View the contract</LinkHeader>
          <ContractLink href={`${config.blockExplorerUrl}address/${config.contractAddress}`} target="_blank" rel="noreferrer">
            <ContractAddress>{config.contractAddress}</ContractAddress>
            <OpenInNewIcon />
          </ContractLink>
        </div>

        <div>
          <LinkHeader variant="h6">View site on unstoppable domains</LinkHeader>

          If you have a web3 capable browser, visit:
          {' '}
          <MuiLink href="http://chainmandala.crypto">chainmandala.crypto</MuiLink>

        </div>

        <div>
          <LinkHeader variant="h6">More links:</LinkHeader>
          <LogoLinks>
            <LogoLink image="./opensea-logo.png" tooltipText="View on Opensea" href="https://opensea.io/collection/chain-mandala" />
          </LogoLinks>
        </div>
      </BlurbHolder>
    </TopRow>
    <PreviousNFTs />
  </div>
);

export default Home;
