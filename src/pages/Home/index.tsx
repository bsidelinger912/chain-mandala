/**
 * @class Home
 * @description
 */

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import LatestNFT from './LatestNFT';
import PreviousNFTs from './PreviousNFTs';

const TopRow = styled.div`
  display: flex;
`;

const LatestNFTHolder = styled.div`
  width: 50%;
  margin-right: 20px;
`;

const BlurbHeader = styled(Typography)`
  margin-top: 30px;
`;

const Home: React.FC = () => (
  <div>
    <TopRow>
      <LatestNFTHolder>
        <LatestNFT />
      </LatestNFTHolder>

      <div>
        <Button size="large" variant="contained" component={Link} to="/create">
          Mint your Free NFT! (limited offer)
        </Button>

        <BlurbHeader variant="h5">About the project</BlurbHeader>
        <p>Blah, some words about the project...</p>
      </div>
    </TopRow>
    <PreviousNFTs />
  </div>
);

export default Home;
