/**
 * @class Mandala
 * @description
 */

import React, { useState } from 'react';
import { getColors } from '../colors';
import Canvas from './Canvas';
import {
  canvasHeight, canvasWidth, drawInterval, iterations, startingPointEdgeBuffer,
} from './constants';
import { chooseShape, draw, getRadian } from './functions';
import MintNFT from './MintNFT';

export interface Props {
  birthDate: number;
}

const Mandala: React.FC<Props> = ({ birthDate }) => {
  const canvasRef = React.createRef<HTMLCanvasElement>();
  const buttonRef = React.createRef<HTMLButtonElement>();

  const [metaDataUri, setMetaDataUri] = useState<string>();

  const generate = (): void => {
    if (!canvasRef.current) return;

    (buttonRef.current as HTMLButtonElement).disabled = true;

    const ctx = canvasRef.current.getContext('2d') as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // set canvas background based on current pallette
    // ctx.beginPath();
    // ctx.rect(0, 0, canvasWidth, canvasHeight);
    // ctx.fillStyle = currentPallette.backGround;
    // ctx.fill();

    const radian = getRadian(6, 12);
    let x = Math.round(Math.random() * (canvasWidth - (startingPointEdgeBuffer * 2))) + startingPointEdgeBuffer;
    let y = Math.round(Math.random() * (canvasHeight - (startingPointEdgeBuffer * 2))) + startingPointEdgeBuffer;
    let iterationsLeft = iterations;

    const interval = setInterval(() => {
      if (iterationsLeft < 1) {
        clearInterval(interval);
        (buttonRef.current as HTMLButtonElement).disabled = false;
        setMetaDataUri(canvasRef.current?.toDataURL());
        return;
      }

      const shape = chooseShape();

      const nextCoords = draw(ctx, x, y, radian, getColors(birthDate), shape);
      [x, y] = nextCoords;
      iterationsLeft -= 1;
    }, drawInterval);
  };

  return (
    <div>
      <Canvas ref={canvasRef} />

      <div className="Mandala_buttonWrapper">
        <button type="button" ref={buttonRef} onClick={generate}>Generate</button>

        <MintNFT metaDataUri={metaDataUri} />
      </div>
    </div>
  );
};

export default Mandala;
