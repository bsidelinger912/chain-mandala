/**
 * @class SVG
 * @description 
 */

import React from 'react';
import { spline } from './util';

export interface Props {
}

function random(min: number, max: number, float = false) {
  const val = Math.random() * (max - min) + min;

  if (float) {
    return val;
  }

  return Math.floor(val);
}

function bodyPath() {
  // choose a random number of points
  const numPoints = random(3, 12);
  // step used to place each point at equal distances
  const angleStep = (Math.PI * 2) / numPoints;

  // keep track of our points
  const points: {x: number, y: number}[] = [];

  for (let i = 1; i <= numPoints; i++) {
    // how much randomness should be added to each point
    const pull = random(0.75, 1, true);

    // x & y coordinates of the current point
     x = x + Math.cos(i * angleStep) * (size * pull);
     y = y + Math.sin(i * angleStep) * (size * pull);

    // push the point to the points array
    points.push({ x, y });
  }

  console.log(points);

  // generate a smooth continuous curve based on the points, using bezier curves. spline() will return an svg path-data string. The arguments are (points, tension, close). Play with tension and check out the effect!
  const pathData = spline(points, 1, true);

  return pathData;
}

const size = random(50, 80);

const width = 300;
const height = 300;
let x = width / 2;
let y = height / 2;

const bodyPathData = bodyPath();

const SVG: React.FC<Props> = () => {
  

  return (
    <svg className="SVG" viewBox={`0, 0, ${width}, ${height}`}>
      <path stroke='black' strokeWidth={2} d={bodyPathData} fill='transparent' />
    </svg>
  );
};

export default SVG;
