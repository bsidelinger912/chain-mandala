/**
 * @class CanvasDraw
 * @description 
 */

import React, { useState } from 'react';
import { canvasHeight, canvasWidth, colors, drawInterval, iterations, startingPointEdgeBuffer } from './constants';
import { chooseShape, draw, getRadian } from './functions';

export interface Props {
}
 
const CanvasDraw: React.FC<Props> = () => {
  const canvasRef = React.createRef<HTMLCanvasElement>();
  const buttonRef = React.createRef<HTMLButtonElement>();

  const [currentPallette, setCurrentPallette] = useState(colors.purple);

  const generate = () => {
    if (!canvasRef.current) return;

    (buttonRef.current as HTMLButtonElement).disabled = true;

    const ctx = canvasRef.current.getContext('2d') as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // set canvas background based on current pallette
    ctx.beginPath();
    ctx.rect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = currentPallette.backGround;
    ctx.fill();

    const radian = getRadian(6, 12);
    let x = Math.round(Math.random() * (canvasWidth - (startingPointEdgeBuffer * 2))) + startingPointEdgeBuffer;
    let y = Math.round(Math.random() * (canvasHeight - (startingPointEdgeBuffer * 2))) + startingPointEdgeBuffer;
    let iterationsLeft = iterations;

    const interval = setInterval(() => {
      if (iterationsLeft < 1) {
        clearInterval(interval);
        (buttonRef.current as HTMLButtonElement).disabled = false;
        return;
      }

      const shape = chooseShape();
    
      const nextCoords = draw(ctx, x, y, radian, currentPallette, shape);
      [x, y] = nextCoords;
      iterationsLeft--;
    }, drawInterval);
  }
 
  return (
    <div>
      <canvas height={canvasHeight} width={canvasWidth} className='Mandala_canvas' ref={canvasRef} />

      <div className="Mandala_buttonWrapper">
        <button ref={buttonRef} onClick={generate} >Generate</button>
      </div>
    </div>
  );
};

export default CanvasDraw;
 