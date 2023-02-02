import React, { useEffect } from 'react';
import { OtherTools } from '../styles';
import wrapText from '../Tools';
const RightPanel = ( { children, canvasRef, selectedMeme, isExporting, textInputs, text, setIsExporting, active } ) => {

    useEffect(() => { 
        if (!isExporting) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.src = selectedMeme.url;
        image.onload = () => {
          ctx.drawImage(
            image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height
          );
          let metrics = ctx.measureText(text);
          let fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
          let actualHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
            let scale = fontHeight / actualHeight;
            const resizeText = (canvas, text, font, width) => {
                let fontSize = 46;
                do {
                    fontSize--;
                    canvas.font = fontSize + "px " + font;
                } while (canvas.measureText(text).width > width);
                return fontSize;
            };
          let fontSize = resizeText(ctx, text, "Arial Black", canvas.width * 0.8);
          let wrappedText = wrapText(ctx, text.toUpperCase(), 48, 69, 1050, 140);

          textInputs.forEach((input, index) => {
            ctx.font = "bold 48px Arial Black";
            ctx.shadowColor = "black";
            ctx.shadowBlur = 15;
            ctx.lineWidth = 5;
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.textBaseline = "center";
            wrappedText.forEach(function(item) {
                ctx.fillText(item[0], item[1], item[2]); 
            });
            });

          const dataURL = canvas.toDataURL();
          const link = document.createElement("a");
        //   link.download = "meme.png";
        //   link.href = dataURL;
        //   link.click();
          setIsExporting(false);
        };
      }, [isExporting, selectedMeme, textInputs, active, text]);
    return (
        <OtherTools>
          <p>Preview</p>
          <canvas ref={canvasRef} 
            width={selectedMeme ? selectedMeme.width : 0}
            height={selectedMeme ? selectedMeme.height : 0}
          />
          { children }
        </OtherTools>
    );
}

export default RightPanel;