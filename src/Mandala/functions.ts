import { canvasHeight, canvasWidth, lineMaxDistance, symmetry } from "./constants";
import { drawLine } from "./line";
import { Pallette, Shape } from "./types";

export function getSymmetryPoints(x: number, y: number, radian: number) {
  // The coordinate system has its origin at the center of the canvas,
  // has up as 0 degrees, right as 90 deg, down as 180 deg, and left as 270 deg.
  var ctrX = symmetry / 2;
  var ctrY = symmetry / 2;
  var relX = x - ctrX;
  var relY = ctrY - y;
  var dist = Math.hypot(relX, relY);
  var angle = Math.atan2(relX, relY); // Radians
  var result = [];
  for (var i = 0; i < radian; i++) {
    var theta = angle + ((Math.PI * 2) / radian) * i; // Radians
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

export const draw = (ctx: CanvasRenderingContext2D, x: number, y: number, radian: number, pallette: Pallette, shape: Shape) => {
  const xDelta = Math.round((Math.random() * lineMaxDistance) - (lineMaxDistance / 2));
  const yDelta = Math.round((Math.random() * lineMaxDistance) - (lineMaxDistance / 2));

  const x2 = Math.max(Math.min(x + xDelta, canvasWidth), 0);
  const y2 = Math.max(Math.min(y + yDelta, canvasHeight), 0);

  const startPoints = getSymmetryPoints(x, y, radian);
  const endPoints = getSymmetryPoints(x2, y2, radian);

  switch(shape) {
    case 'line': 
    default:
      const color = pallette.tones[Math.round(Math.random() * pallette.tones.length)];
      const width = Math.round(Math.random() * 10);
      
      for (var i = 0; i < startPoints.length; i++) {
        drawLine(ctx, startPoints[i][0], startPoints[i][1], endPoints[i][0], endPoints[i][1], color, width);
      }
  }

  return [x2, y2];
};