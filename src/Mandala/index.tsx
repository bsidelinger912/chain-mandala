/**
 * @class Mandala
 * @description
 */

import React, { useState } from 'react';
import pica from 'pica';

import { getColors } from '../colors';
import Canvas from './Canvas';
import {
  canvasHeight, canvasWidth, drawInterval, iterations, startingPointEdgeBuffer,
} from './constants';
import { chooseShape, draw, getRadian } from './functions';
import MintNFT from './MintNFT';

export interface Props {
  birthDate: number;
  account?: string;
}

const Mandala: React.FC<Props> = ({ birthDate, account }) => {
  const canvasRef = React.createRef<HTMLCanvasElement>();
  const hiddenCanvasRef = React.createRef<HTMLCanvasElement>();
  const buttonRef = React.createRef<HTMLButtonElement>();

  const [imageUri, setImageUri] = useState<string>();

  const generate = (): void => {
    if (!canvasRef.current) return;

    (buttonRef.current as HTMLButtonElement).disabled = true;

    const ctx = canvasRef.current.getContext('2d') as CanvasRenderingContext2D;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.beginPath();
    ctx.rect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = '#282c34';
    ctx.fill();

    const radian = getRadian(6, 12);
    let x = Math.round(Math.random() * (canvasWidth - (startingPointEdgeBuffer * 2))) + startingPointEdgeBuffer;
    let y = Math.round(Math.random() * (canvasHeight - (startingPointEdgeBuffer * 2))) + startingPointEdgeBuffer;
    let iterationsLeft = iterations;

    const interval = setInterval(() => {
      if (iterationsLeft < 1) {
        clearInterval(interval);
        (buttonRef.current as HTMLButtonElement).disabled = false;

        if (!canvasRef.current || !hiddenCanvasRef.current) {
          return;
        }

        // setImageUri(canvasRef.current?.toDataURL('image/png', 0.1));

        const picaInstance = pica();
        picaInstance.resize(canvasRef.current, hiddenCanvasRef.current).then(() => {
          setImageUri(hiddenCanvasRef.current?.toDataURL('image/png', 0.1));
        });

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

        <MintNFT imageUri={imageUri} birthDate={birthDate} account={account} />
      </div>

      <canvas width={100} height={100} className="hiddenCanvas" ref={hiddenCanvasRef} />
    </div>
  );
};

export default Mandala;
