/**
 * @class CanvasDraw
 * @description 
 */

import React from 'react';

export interface Props {
}

interface Numbers {
  headLeftOffset1: number;
  headLeftOffset2: number;
  headRightOffset1: number;
  headRightOffset2: number;
  mouthOffset1: number;
  mouthOffset2: number;
  bottomOffset1: number;
  bottomOffset2: number;
}

function generate(): number {
  return Math.floor(Math.random() * 10 + 1);
}

function generateNumbers(): Numbers {
  return {
    headLeftOffset1: generate(),
    headLeftOffset2: generate(),
    headRightOffset1: generate(),
    headRightOffset2: generate(),
    mouthOffset1: generate(),
    mouthOffset2: generate(),
    bottomOffset1: generate(),
    bottomOffset2: generate(),
  }
}

const CanvasDraw: React.FC<Props> = () => {
  const canvasRef = React.createRef<HTMLCanvasElement>();

  const [numbers, setNumbers] = React.useState(generateNumbers());

  const redraw = () => {
    setNumbers(generateNumbers());
  }

  React.useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    let start = { x: 150,    y: 50  };
    let cp1 =   { x: 250,   y: 70  };
    let cp2 =   { x: 250,   y: 150  };
    let end =   { x: 250,   y: 200 };

    // Cubic Bézier curve
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
    ctx.stroke();

    const start2 = { x: 150,    y: 50  };
    const cp21 =   { x: 50,   y: 100  };
    const cp22 = { x: 50,   y: 100 };
    const end2 = { x: 50,   y: 200 };

    ctx.beginPath();
    ctx.moveTo(start2.x, start2.y);
    ctx.bezierCurveTo(cp21.x, cp21.y, cp22.x, cp22.y, end2.x, end2.y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(50, 200);
    ctx.lineTo(50, 400);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(250, 200);
    ctx.lineTo(250, 400);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(50, 400);
    ctx.bezierCurveTo(100, 350, 150, 450, 250, 400);
    ctx.stroke();

    // eye 
    ctx.beginPath();
    ctx.arc(120, 200, 30, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(190, 200, 30, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(120, 207, 15, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(190, 207, 15, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(120, 207, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(190, 207, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(80, 280);
    ctx.bezierCurveTo(130, 220, 170, 350, 220, 280);
    ctx.stroke();
  }, []);

  return (
    <canvas height={500} width={300} className='CanvasDraw' ref={canvasRef} />
  );
};

export default CanvasDraw;
