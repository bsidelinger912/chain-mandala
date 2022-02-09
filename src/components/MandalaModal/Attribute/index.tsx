/**
 * @class Attribute
 * @description
 */

import React from 'react';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

export interface Props {
  name: string;
  value: string;
}

const Wrapper = styled.div`
  margin-bottom: 20px;
`;

const Name = styled(Typography)`
  font-weight: bold;
`;

const Attribute: React.FC<Props> = ({ name, value }) => (
  <Wrapper>
    <Name>{`${name}:`}</Name>
    <Typography>{value}</Typography>
  </Wrapper>
);

export default Attribute;
