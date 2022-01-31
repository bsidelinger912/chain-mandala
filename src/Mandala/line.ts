

export const drawLine = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string, width: number) => {
  ctx.lineWidth = width;

  ctx.beginPath();
  ctx.lineCap = "round";

  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  // anti aliased ctx.translate(0.5, 0.5);
  
  ctx.strokeStyle = color;
  ctx.stroke();
}