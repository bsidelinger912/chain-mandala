/**
 * @class Canvas
 * @description 
 */

import React from 'react';

export interface Props {
}

const Canvas: React.FC<Props> = () => {
  const canvasRef = React.createRef<HTMLCanvasElement>();

  return (
    <>
      {/* <img src="//i.imgur.com/SHo6Fub.jpg" width="300" height="234" /> */}
      <canvas 
        ref={canvasRef} 
        className="Canvas" 
        onDragOver={e => e.preventDefault()} 
        onDrop={e => {
          e.preventDefault();
          const files = e.dataTransfer.files;

          if (files.length > 0) {
            const file = files[0];
        
            if (typeof FileReader !== "undefined" && file.type.indexOf("image") !== -1) {
              const reader = new FileReader();
              reader.onload = function (read) {
                console.log('***** have image');

                const canvas = canvasRef.current as HTMLCanvasElement;
                var ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
                // var img = new Image();

                // img.crossOrigin = "anonymous";

                // img.onload = function () {

                //     // set size proportional to image
                //     canvas.height = canvas.width * (img.height / img.width);

                //     // step 1 - resize to 50%
                //     var oc = document.createElement('canvas'),
                //         octx = oc.getContext('2d') as any;

                //     oc.width = img.width * 0.5;
                //     oc.height = img.height * 0.5;
                //     octx.drawImage(img, 0, 0, oc.width, oc.height);

                //     // step 2
                //     octx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5);

                //     // step 3, resize to final size
                //     ctx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5,
                //     0, 0, canvas.width, canvas.height);

                //     console.log(canvas.toDataURL("image/png"))
                // }
                // img.src = "//i.imgur.com/SHo6Fub.jpg";

                // console.log(read?.target?.result);

                const dataUriOriginal = read?.target?.result as string;

                const img = new Image();
                img.crossOrigin = "anonymous";

                img.onload = function () {
                  const canvas = canvasRef.current as HTMLCanvasElement; 
                  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

                  console.log('image loaded!!');

                  // const widthHeightRatio = img.width / img.height;
                  // const resizedWidth = 300 * widthHeightRatio;

                  // console.log(resizedWidth);

                  canvas.height = 150;
                  canvas.width = 150;
                  ctx.drawImage(img, 0, 0, 200, 150);

                  // set size proportional to image
                  // canvas.height = canvas.width * (img.height / img.width);
                  // const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

                  // step 1 - resize to 50%
                  // const oc = document.createElement('canvas'),
                  //     octx = oc.getContext('2d') as any;

                  // oc.width = img.width * 0.5;
                  // oc.height = img.height * 0.5;
                  // octx.drawImage(img, 0, 0, oc.width, oc.height);

                  // // step 2
                  // octx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5);

                  // // step 3, resize to final size
                  // ctx.drawImage(oc, 0, 0, oc.width * 0.5, oc.height * 0.5, 0, 0, canvas.width, canvas.height);

                  console.log(canvas.toDataURL("image/png"));
                }

                img.src = dataUriOriginal;
              };

              reader.readAsDataURL(file);
            }
          }
          
        }} 
      />
    </>
  );
};

export default Canvas;
