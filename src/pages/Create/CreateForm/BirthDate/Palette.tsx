/**
 * @class Palette
 * @description
 */

import React from 'react';
import styled from 'styled-components';

import { getColors } from '../../../../colors';

export interface Props {
  birthDate: number;
}

const Main = styled.div`
  flex-grow: 1;
  height: 30px;
  display: flex;
  border: 1px solid white;
  margin-left: 10px;

  span {
    flex-grow: 1;
  }
`;

const Palette: React.FC<Props> = ({ birthDate }) => {
  const colors = getColors(birthDate);

  return (
    <Main>
      {colors.map((color) => <span key={color} style={{ backgroundColor: color }} />)}
    </Main>
  );
};

export default Palette;
