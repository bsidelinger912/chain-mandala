/**
 * @class Header
 * @description
 */

import React from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const Main = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  margin: 0 0 20px;
`;

const Title = styled(Typography)`
  color: white;
  text-decoration: none;
` as typeof Typography;

const ChainList = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;
`;

const Header: React.FC = () => (
  <Main>
    <div>
      <Title component={Link} to="/" variant="h2">On-chain Mandala</Title>
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
