export interface Pallette {
  tones: string[];
}

export type Shape = 'line' | 'arc' | 'perpendicular';

export type Line = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color: string;
  width: number;
};

export type Perpendicular = Line & {
  x3: number;
  y3: number;
};

export type Curve = Perpendicular;
