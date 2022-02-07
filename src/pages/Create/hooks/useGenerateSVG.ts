import React from 'react';
import { useRecoilState } from 'recoil';
import svgToMiniDataURI from 'mini-svg-data-uri';

import {
  canvasHeight, canvasWidth, drawInterval, startingPointEdgeBuffer,
} from '../constants';
import {
  chooseShape, getCurve, getIterations, getLine, getPerpendicular, getRadian,
} from '../functions';
import shapes from '../atoms/shapes';
import imageUri from '../atoms/imageUri';
import { getColors } from '../../../colors';

interface UseGenerateSVG {
  generate: () => void;
}

export default function useGenerateSVG(birthDate: number, svgRef: React.MutableRefObject<SVGSVGElement | undefined>): UseGenerateSVG {
  const [shapesState, setShapesState] = useRecoilState(shapes);
  const [imageUriState, setImageUriState] = useRecoilState(imageUri);

  const generate = (): void => {
    const radian = getRadian(6, 10);
    const x = Math.round(Math.random() * (canvasWidth - (startingPointEdgeBuffer * 2))) + startingPointEdgeBuffer;
    const y = Math.round(Math.random() * (canvasHeight - (startingPointEdgeBuffer * 2))) + startingPointEdgeBuffer;
    let iterationsLeft = getIterations(radian);

    setShapesState({
      lines: [],
      perpendiculars: [],
      curves: [],
    });

    const interval = setInterval(() => {
      if (iterationsLeft < 1) {
        clearInterval(interval);

        const image = svgRef.current?.outerHTML as string;
        setImageUriState(svgToMiniDataURI(image));

        return;
      }

      const shape = chooseShape();

      setShapesState((currentShapesState) => {
        switch (shape) {
          case 'perpendicular':
            return {
              ...currentShapesState,
              perpendiculars: currentShapesState.perpendiculars.concat(getPerpendicular(x, y, radian, getColors(birthDate))),
            };

          case 'arc':
            return {
              ...currentShapesState,
              curves: currentShapesState.curves.concat(getCurve(x, y, radian, getColors(birthDate))),
            };

          case 'line':
          default:
            return {
              ...currentShapesState,
              lines: currentShapesState.lines.concat(getLine(x, y, radian, getColors(birthDate))),
            };
        }
      });

      iterationsLeft -= 1;
    }, drawInterval);
  };

  return { generate };
}
