import {
  allShapes, canvasHeight, canvasWidth, lineMaxDistance, symmetry,
} from './constants';
import {
  Curve,
  Line, Pallette, Perpendicular, Shape,
} from './types';

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

export function getIterations(radian: number): number {
  return Math.ceil(30 / radian);
}

export function getRandomColor(pallette: Pallette): string {
  return pallette.tones[Math.round(Math.random() * pallette.tones.length)];
}

export const getLine = (x: number, y: number, radian: number, colors: string[]): Line[] => {
  const xDelta = Math.round((Math.random() * lineMaxDistance) - (lineMaxDistance / 2));
  const yDelta = Math.round((Math.random() * lineMaxDistance) - (lineMaxDistance / 2));

  const x2 = Math.max(Math.min(x + xDelta, canvasWidth), 0);
  const y2 = Math.max(Math.min(y + yDelta, canvasHeight), 0);

  const startPoints = getSymmetryPoints(x, y, radian);
  const endPoints = getSymmetryPoints(x2, y2, radian);

  const color = colors[Math.round(Math.random() * colors.length)];
  const width = Math.round(Math.random() * 5);

  return startPoints.map((_, i) => ({
    x1: startPoints[i][0],
    y1: startPoints[i][1],
    x2: endPoints[i][0],
    y2: endPoints[i][1],
    color,
    width,
  }));
};

export function getPerpendicular(x: number, y: number, radian: number, colors: string[]): Perpendicular[] {
  const endLength = Math.round(Math.random() * lineMaxDistance);

  return getLine(x, y, radian, colors).map((line, index) => {
    const {
      x1, y1, x2, y2,
    } = line;
    let px = y1 - y2;
    let py = x2 - x1;
    const len = endLength / Math.hypot(px, py);
    px *= len;
    py *= len;

    const endPoint = (index % 2 === 0) ? { x: x2 + px, y: y2 + py } : { x: x2 - px, y: y2 - py };

    return { ...line, x3: endPoint.x, y3: endPoint.y };
  });
}

export function getCurve(x: number, y: number, radian: number, colors: string[]): Curve[] {
  return getPerpendicular(x, y, radian, colors);
}

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
