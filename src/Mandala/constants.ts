import { Pallette } from "./types";

export const canvasWidth = 500;
export const canvasHeight = 500;
export const startingPointEdgeBuffer = 100; // if you start the algo at the edge or middle it can get too wonky, this is used to keep the start away from the edges or middle
export const symmetry = canvasWidth;
export const xCenter = symmetry / 2;
export const lineMaxDistance = 200;
export const iterations = 20;
export const drawInterval = 500;

export const colors: Record<string, Pallette> = {
  purple: {
    backGround: '#062726',
    tones: [
      '#E2CFEA',
      '#A06CD5',
      '#6247AA',
      '#102B3F',
    ],
  }
};
