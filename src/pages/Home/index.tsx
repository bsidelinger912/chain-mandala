/**
 * @class Home
 * @description
 */

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import MuiLink from '@mui/material/Link';

import LatestNFT from './LatestNFT';
import PreviousNFTs from './PreviousNFTs';
import config from '../../config';

const TopRow = styled.div`
  display: flex;
`;

const LatestNFTHolder = styled.div`
  width: 50%;
  margin-right: 20px;
`;

const BlurbHolder = styled.div`
  width: 50%;
`;

const BlurbHeader = styled(Typography)`
  margin-top: 0px;
`;

const LinkHeader = styled(Typography)`
  margin-top: 30px;
`;

const MintButton = styled(Button)`
  margin: 30px 0 20px;
` as any;

const Home: React.FC = () => (
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
        <p>
          You also need to make sure you have Polygon set up on your wallet, the project is currently only deployed to Polygon.
        </p>

        <MintButton size="large" variant="contained" component={Link} to="/create">
          I have some MDLA token, lets mint!
        </MintButton>

        <div>
          <LinkHeader variant="h6">View the contract</LinkHeader>
          <MuiLink href={`${config.blockExplorerUrl}address/${config.contractAddress}`} target="_blank" rel="noreferrer">
            {`${config.contractAddress}`}
            <OpenInNewIcon />
          </MuiLink>
        </div>
      </BlurbHolder>
    </TopRow>
    <PreviousNFTs />
  </div>
);

export default Home;
