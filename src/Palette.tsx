/**
 * @class Palette
 * @description
 */

import React from 'react';
import { getColors } from './colors';

export interface Props {
  birthDate: number;
}

const Palette: React.FC<Props> = ({ birthDate }) => {
  const colors = getColors(birthDate);

  return (
    <div className="Palette">
      {colors.map((color) => <span key={color} style={{ backgroundColor: color }} />)}
    </div>
  );
};

export default Palette;
