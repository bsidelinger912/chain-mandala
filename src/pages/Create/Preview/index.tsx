/**
 * @class Preview
 * @description
 */

import React from 'react';
import { useRecoilValue } from 'recoil';
import shapes from '../atoms/shapes';

const Preview = React.forwardRef<SVGSVGElement>((_, ref) => {
  const { lines, perpendiculars, curves } = useRecoilValue(shapes);

  return (
    <div>
      <svg
        ref={ref}
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
            key={`${curve.x1}${curve.y1}${curve.x2}${curve.y2}`}
            d={`M ${curve.x1} ${curve.y1} Q ${curve.x2} ${curve.y2} ${curve.x3} ${curve.y3}`}
            stroke={curve.color}
            strokeWidth={curve.width}
            fill="transparent"
          />
        ))}
      </svg>
    </div>
  );
});

export default Preview;
