export const drawPerpendicular = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string, width: number, endLength: number, index: number) => {
  ctx.lineWidth = width;

  ctx.beginPath();
  ctx.lineCap = "round";

  var px = y1 - y2; // as vector at 90 deg to the line
  var py = x2 - x1;
  const len = endLength / Math.hypot(px, py);
  px *= len;  // make length 10 pixels
  py *= len; 

  const endPoint = (index % 2 === 0) ? { x: x2 + px, y: y2 + py} : { x: x2 - px, y: y2 - py };

  // start
  ctx.moveTo(x1, y1);
 
  // corner spot
  ctx.lineTo(x2, y2);

  // end
  ctx.lineTo(endPoint.x, endPoint.y);
  // anti aliased ctx.translate(0.5, 0.5);
  
  ctx.strokeStyle = color;
  ctx.stroke();
}