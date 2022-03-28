/**
 * @class Header
 * @description
 */

import React from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import { singleColumnWidth } from '../cssConstants';

const Main = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  margin: 0 0 20px;

  @media (max-width: ${singleColumnWidth}) {
    flex-direction: column;
    align-items: flex-start;
    padding: 0;
  }
`;

const Title = styled(Typography)`
  color: white;
  text-decoration: none;

  @media (max-width: ${singleColumnWidth}) {
    font-size: 3rem;
  }
` as typeof Typography;

const ChainList = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;

  @media (max-width: ${singleColumnWidth}) {
    margin-top: 20px;
  }
`;

const Header: React.FC = () => (
  <Main>
    <div>
      <Title variant="h2">Chain Mandala</Title>
      <Typography variant="h5">Digital art with permanence</Typography>
    </div>
    <ChainList>
      <Typography variant="subtitle1">
        Currently deployed on: &nbsp;
      </Typography>
      <img width="30" height="30" src="./polygon-matic-logo.png" alt="polygon" />
    </ChainList>
  </Main>
);

export default Header;
