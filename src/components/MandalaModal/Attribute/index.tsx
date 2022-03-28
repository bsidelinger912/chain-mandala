/**
 * @class Attribute
 * @description
 */

import React from 'react';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import { singleColumnWidth } from '../../../cssConstants';

export interface Props {
  name: string;
  value: string;
}

const Wrapper = styled.div`
  margin-bottom: 20px;

  @media (max-width: ${singleColumnWidth}) {
    width: calc(50% - 10px);
    display: flex;
  }
`;

const Name = styled(Typography)`
  font-weight: bold;

  @media (max-width: ${singleColumnWidth}) {
    margin-right: 5px;
  }
`;

const Value = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Attribute: React.FC<Props> = ({ name, value }) => (
  <Wrapper>
    <Name>{`${name}:`}</Name>
    <Value>{value}</Value>
  </Wrapper>
);

export default Attribute;
