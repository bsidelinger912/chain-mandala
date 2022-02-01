/**
 * @class Canvas
 * @description
 */

import React from 'react';

import { canvasHeight, canvasWidth } from './constants';

export interface Props {
  // ref: React.RefObject<HTMLCanvasElement>;
}

const Canvas = React.forwardRef<HTMLCanvasElement, Props>((props, ref) => (
  <canvas height={canvasHeight} width={canvasWidth} className="Mandala_canvas" ref={ref} />
));

export default React.memo(Canvas);
