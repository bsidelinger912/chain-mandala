import { atom } from 'recoil';
import { Curve, Line, Perpendicular } from '../types';

interface Shapes {
  lines: Line[];
  perpendiculars: Perpendicular[];
  curves: Curve[];
}

export const emptyShapes: Shapes = {
  lines: [],
  perpendiculars: [],
  curves: [],
};

const shapes = atom<Shapes>({
  key: 'mandala-nft-shapes',
  default: emptyShapes,
});

export default shapes;
