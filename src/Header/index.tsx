/**
 * @class Header
 * @description
 */

import React from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useAuth } from '../auth/AuthProvider';

const Main = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
`;

const RightColumn = styled.div``;

const Header: React.FC = () => {
  const { connect, account } = useAuth();

  return (
    <Main>
      <Typography variant="h2">On-chain Mandala</Typography>
      <RightColumn className="App-header-right">
        {account
          ? <Typography>Connected</Typography>
          : <Button variant="contained" onClick={connect}>Connect wallet</Button>}
      </RightColumn>
    </Main>
  );
};

export default Header;
