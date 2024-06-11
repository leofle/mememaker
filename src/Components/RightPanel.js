import React, { useEffect } from 'react';
import { OtherTools } from '../styles';

const RightPanel = ({ children, canvasRef, selectedMeme, isExporting, textInputs, setIsExporting }) => {
    useEffect(() => { 
        if (!isExporting) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.src = selectedMeme.url;
        image.onload = () => {
          const scaleWidth = canvas.width / image.width;
          const scaleHeight = canvas.height / image.height;
          const scale = Math.min(scaleWidth, scaleHeight);

          ctx.drawImage(
            image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height
          );

          textInputs.forEach((input) => {
            const scaledX = input.x * scale;
            const scaledY = input.y * scale;
            const scaledFontSize = 30 * scale;  // Adjust font size scaling as needed

            ctx.font = `${scaledFontSize}px Arial`;
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.lineWidth = 3;
            ctx.strokeStyle = "black";

            const textX = scaledX + (input.width * scale) / 2;
            const textY = scaledY + (input.height * scale) / 2;

            ctx.strokeText(input.text.toUpperCase(), textX, textY);
            ctx.fillText(input.text.toUpperCase(), textX, textY);
          });

          const dataURL = canvas.toDataURL();
          const link = document.createElement("a");
          link.download = "meme.png";
          link.href = dataURL;
          link.click();
          setIsExporting(false);
        };
      }, [isExporting, selectedMeme, textInputs, setIsExporting]);

    return (
        <OtherTools>
          <p>Preview</p>
          <canvas ref={canvasRef} 
            width={selectedMeme ? selectedMeme.width : 0}
            height={selectedMeme ? selectedMeme.height : 0}
          />
          {children}
        </OtherTools>
    );
}

export default RightPanel;
