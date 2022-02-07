import { atom } from 'recoil';
import { Curve, Line, Perpendicular } from '../types';

interface Shapes {
  lines: Line[];
  perpendiculars: Perpendicular[];
  curves: Curve[];
}

const shapes = atom<Shapes>({
  key: 'mandala-nft-shapes',
  default: {
    lines: [],
    perpendiculars: [],
    curves: [],
  },
});

export default shapes;
