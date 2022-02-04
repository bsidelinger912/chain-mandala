import { drawArc } from './arc';
import {
  allShapes, canvasHeight, canvasWidth, lineMaxDistance, symmetry,
} from './constants';
import { drawLine } from './line';
import { drawPerpendicular } from './perpendicular';
import { Pallette, Shape } from './types';

export function getSymmetryPoints(x: number, y: number, radian: number): number[][] {
  // The coordinate system has its origin at the center of the canvas,
  // has up as 0 degrees, right as 90 deg, down as 180 deg, and left as 270 deg.
  const ctrX = symmetry / 2;
  const ctrY = symmetry / 2;
  const relX = x - ctrX;
  const relY = ctrY - y;
  const dist = Math.hypot(relX, relY);
  const angle = Math.atan2(relX, relY); // Radians
  const result = [];
  for (let i = 0; i < radian; i++) {
    const theta = angle + ((Math.PI * 2) / radian) * i; // Radians
    x = ctrX + Math.sin(theta) * dist;
    y = ctrY - Math.cos(theta) * dist;
    result.push([x, y]);
    if (true) {
      x = ctrX - Math.sin(theta) * dist;
      result.push([x, y]);
    }
  }

  return result;
}

export function getRadian(start: number, finish: number): number {
  const random = Math.round((Math.random() * start) + finish - start);

  return (random % 2 === 0) ? random : random + 1;
}

export function getRandomColor(pallette: Pallette): string {
  return pallette.tones[Math.round(Math.random() * pallette.tones.length)];
}

export const draw = (ctx: CanvasRenderingContext2D, x: number, y: number, radian: number, colors: string[], shape: Shape): [number, number] => {
  const xDelta = Math.round((Math.random() * lineMaxDistance) - (lineMaxDistance / 2));
  const yDelta = Math.round((Math.random() * lineMaxDistance) - (lineMaxDistance / 2));

  const x2 = Math.max(Math.min(x + xDelta, canvasWidth), 0);
  const y2 = Math.max(Math.min(y + yDelta, canvasHeight), 0);

  const startPoints = getSymmetryPoints(x, y, radian);
  const endPoints = getSymmetryPoints(x2, y2, radian);

  const color = colors[Math.round(Math.random() * colors.length)];
  const width = Math.round(Math.random() * 10);
  const endLength = Math.round(Math.random() * lineMaxDistance);

  for (let i = 0; i < startPoints.length; i++) {
    switch (shape) {
      case 'perpendicular':
        drawPerpendicular(ctx, startPoints[i][0], startPoints[i][1], endPoints[i][0], endPoints[i][1], color, width, endLength, i);

        break;
      case 'arc':
        drawArc(ctx, startPoints[i][0], startPoints[i][1], endPoints[i][0], endPoints[i][1], color, width, endLength, i);

        break;
      case 'line':
      default:
        drawLine(ctx, startPoints[i][0], startPoints[i][1], endPoints[i][0], endPoints[i][1], color, width);
    }
  }

  return [x2, y2];
};

export function getDistance(x1: number, y1: number, x2: number, y2: number): number {
  const y = x2 - x1;
  const x = y2 - y1;

  return Math.sqrt(x * x + y * y);
}

/**
 * Weighted function to prefer arc, but still randomize
 * @returns Shape
 */
export function chooseShape(): Shape {
  const randomShape = allShapes[Math.round(Math.random() * allShapes.length)];

  // weight for arc
  const useArc = Math.random() > 0.5;

  return useArc ? allShapes[0] : randomShape;
}
