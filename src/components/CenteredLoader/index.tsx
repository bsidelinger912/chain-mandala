/**
 * @class CenteredLoader
 * @description
 */

import React from 'react';
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CenteredLoader: React.FC = () => (
  <Wrapper>
    <CircularProgress />
  </Wrapper>
);

export default CenteredLoader;
