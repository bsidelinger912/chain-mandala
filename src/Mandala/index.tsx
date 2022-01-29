/**
 * @class CanvasDraw
 * @description 
 */

import React from 'react';
import { canvasHeight, canvasWidth, colors, drawInterval, iterations, lineMaxDistance } from './constants';
import { getSymmetryPoints } from './functions';

export interface Props {
}
 
const CanvasDraw: React.FC<Props> = () => {
  const canvasRef = React.createRef<HTMLCanvasElement>();
  const buttonRef = React.createRef<HTMLButtonElement>();

  const draw = (x: number, y: number, radian: number) => {
    const xDelta = Math.round((Math.random() * lineMaxDistance) - (lineMaxDistance / 2));
    const yDelta = Math.round((Math.random() * lineMaxDistance) - (lineMaxDistance / 2));
    const brushWidth = Math.round(Math.random() * 10);

    const newX = Math.max(Math.min(x + xDelta, canvasWidth), 0);
    const newY = Math.max(Math.min(y + yDelta, canvasHeight), 0);

    drawLine(x, y, newX, newY, brushWidth, radian);

    return [newX, newY];
  };

  const drawLine = (x1: number, y1: number, x2: number, y2: number, brushSize: number, radian: number) => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext('2d') as CanvasRenderingContext2D;

    const startPoints = getSymmetryPoints(x1, y1, radian);
    const endPoints = getSymmetryPoints(x2, y2, radian);
  
    ctx.lineWidth = brushSize;
  
    ctx.beginPath();
    ctx.lineCap = "round";
  
    for (var i = 0; i < startPoints.length; i++) {
      ctx.moveTo(startPoints[i][0], startPoints[i][1]);
      ctx.lineTo(endPoints[i][0], endPoints[i][1]);
    }
    // anti aliased ctx.translate(0.5, 0.5);
    
    ctx.strokeStyle = colors[Math.round(Math.random() * 6)];
    ctx.stroke();
  }

  const generate = () => {
    if (!canvasRef.current) return;

    (buttonRef.current as HTMLButtonElement).disabled = true;

    const ctx = canvasRef.current.getContext('2d') as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    const radian = Math.round((Math.random() * 6) + 6);
    let x = Math.round(Math.random() * 300) + 100;
    let y = Math.round(Math.random() * 300) + 100;
    let iterationsLeft = iterations;

    const interval = setInterval(() => {
      if (iterationsLeft < 1) {
        clearInterval(interval);
        (buttonRef.current as HTMLButtonElement).disabled = false;
        return;
      }

      const nextCoords = draw(x, y, radian);
      [x, y] = nextCoords;
      iterationsLeft--;
    }, drawInterval);
  }
 
  return (
    <div>
      <canvas height={500} width={500} className='CanvasDraw' ref={canvasRef} />

      <div className="Mandala_buttonWrapper">
        <button ref={buttonRef} onClick={generate} >Generate</button>
      </div>
    </div>
  );
};

export default CanvasDraw;
 