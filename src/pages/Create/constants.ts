import { Shape } from './types';

export const canvasWidth = 500;
export const canvasHeight = 500;
// if you start the algo at the edge or middle it can get too wonky, this is used to keep the start away from the edges or middle
export const startingPointEdgeBuffer = 100;
export const symmetry = canvasWidth;
export const xCenter = symmetry / 2;
export const lineMaxDistance = 200;
export const drawInterval = 500;

export const colorNumbers = [
  {
    hue: 30,
    dates: [1, 10, 19, 28],
    variation: 'hard',
  },
  {
    hue: 70,
    dates: [2, 11, 20, 29],
    variation: 'pale',
  },
  {
    hue: 100,
    dates: [1, 12, 21, 30],
    variation: 'default',
  },
  {
    hue: 260,
    dates: [4, 13, 22, 31],
    variation: 'soft',
  },
  {
    hue: 135,
    dates: [4, 14, 23],
    variation: 'hard',
  },
  {
    hue: 210,
    dates: [6, 15, 24],
    variation: 'light',
  },
  {
    hue: 150,
    dates: [6, 16, 25],
    variation: 'pastel',
  },
  {
    hue: 240,
    dates: [8, 17, 26],
    variation: 'hard',
  },
  {
    hue: 10,
    dates: [9, 18, 27],
    variation: 'hard',
  },
];

export const allShapes: Shape[] = ['arc', 'line', 'perpendicular'];
