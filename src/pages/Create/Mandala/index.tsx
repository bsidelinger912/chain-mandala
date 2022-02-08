/**
 * @class Mandala
 * @description
 */

import React, { useState } from 'react';
import svgToMiniDataURI from 'mini-svg-data-uri';

import { getColors } from '../../../colors';
import {
  canvasHeight, canvasWidth, drawInterval, startingPointEdgeBuffer,
} from '../constants';
import {
  chooseShape, getCurve, getIterations, getLine, getPerpendicular, getRadian,
} from '../functions';
import MintNFT from './MintNFT';
import { Curve, Line, Perpendicular } from '../types';

export interface Props {
  birthDate: number;
}

const Mandala: React.FC<Props> = ({ birthDate }) => {
  const buttonRef = React.useRef<HTMLButtonElement>();
  const svgRef = React.useRef<SVGSVGElement>();

  const [imageUri, setImageUri] = useState<string>();
  const [lines, setLines] = useState<Line[]>([]);
  const [perpendiculars, setPerpendiculars] = useState<Perpendicular[]>([]);
  const [curves, setCurves] = useState<Curve[]>([]);

  const generate = (): void => {
    (buttonRef.current as HTMLButtonElement).disabled = true;

    const radian = getRadian(6, 10);
    const x = Math.round(Math.random() * (canvasWidth - (startingPointEdgeBuffer * 2))) + startingPointEdgeBuffer;
    const y = Math.round(Math.random() * (canvasHeight - (startingPointEdgeBuffer * 2))) + startingPointEdgeBuffer;
    let iterationsLeft = getIterations(radian);

    setLines([]);
    setPerpendiculars([]);
    setCurves([]);

    const interval = setInterval(() => {
      if (iterationsLeft < 1) {
        clearInterval(interval);
        (buttonRef.current as HTMLButtonElement).disabled = false;

        const image = svgRef.current?.outerHTML as string;
        setImageUri(svgToMiniDataURI(image));

        return;
      }

      const shape = chooseShape();

      switch (shape) {
        case 'perpendicular':
          setPerpendiculars((currentPerpendiculars) => currentPerpendiculars.concat(getPerpendicular(x, y, radian, getColors(birthDate))));
          break;

        case 'arc':
          setCurves((currentCurves) => currentCurves.concat(getCurve(x, y, radian, getColors(birthDate))));
          break;

        case 'line':
        default:
          setLines((currentLines) => currentLines.concat(getLine(x, y, radian, getColors(birthDate))));
      }

      iterationsLeft -= 1;
    }, drawInterval);
  };

  return (
    <div>
      <svg
        ref={svgRef as React.LegacyRef<SVGSVGElement>}
        className="Mandala_svg"
        viewBox="0 0 500 500"
        style={{ backgroundColor: '#282c34' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {lines.map((line) => (
          <line
            key={`${line.x1}${line.y1}${line.x2}${line.y2}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke={line.color}
            strokeWidth={line.width}
          />
        ))}
        {perpendiculars.map((perpendicular) => (
          <React.Fragment key={`${perpendicular.x1}${perpendicular.y1}${perpendicular.x2}${perpendicular.y2}`}>
            <line
              x1={perpendicular.x1}
              y1={perpendicular.y1}
              x2={perpendicular.x2}
              y2={perpendicular.y2}
              stroke={perpendicular.color}
              strokeWidth={perpendicular.width}
            />
            <line
              x1={perpendicular.x2}
              y1={perpendicular.y2}
              x2={perpendicular.x3}
              y2={perpendicular.y3}
              stroke={perpendicular.color}
              strokeWidth={perpendicular.width}
            />
          </React.Fragment>
        ))}
        {curves.map((curve) => (
          <path
            d={`M ${curve.x1} ${curve.y1} Q ${curve.x2} ${curve.y2} ${curve.x3} ${curve.y3}`}
            stroke={curve.color}
            strokeWidth={curve.width}
            fill="transparent"
          />
        ))}
      </svg>

      <div className="Mandala_buttonWrapper">
        <button type="button" ref={buttonRef as React.LegacyRef<HTMLButtonElement>} onClick={generate}>Generate</button>

        <MintNFT imageUri={imageUri} birthDate={birthDate} />
      </div>
    </div>
  );
};

export default Mandala;
