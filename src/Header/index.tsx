/**
 * @class Header
 * @description
 */

import React from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import { useAuth } from '../auth/AuthProvider';

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

const RightColumn = styled.div``;

const Header: React.FC = () => {
  const { connect, account } = useAuth();

  return (
    <Main>
      <div>
        <Title component={Link} to="/" variant="h2">On-chain Mandala</Title>
        <Typography variant="h5">Digital art with permanence</Typography>
      </div>

      <RightColumn className="App-header-right">
        {account
          ? <Typography>Connected</Typography>
          : <Button variant="contained" onClick={connect}>Connect wallet</Button>}
      </RightColumn>
    </Main>
  );
};

export default Header;
