import React, { forwardRef, useEffect } from 'react';

const MemeCanvas = forwardRef(({ meme, textElements }, ref) => {
    useEffect(() => {
        const canvas = ref.current;
        const ctx = canvas.getContext('2d');
        const image = new Image();
        image.crossOrigin = "Anonymous";
        const imageUrl = `https://corsproxy.io/?${encodeURIComponent(meme.url)}`;
        image.src = imageUrl;
        image.onload = () => {
            const aspectRatio = image.width / image.height;
            const canvasWidth = 500; // Fixed width
            const canvasHeight = canvasWidth / aspectRatio;
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            textElements.forEach(el => {
                ctx.font = '30px Arial';
                ctx.fillStyle = 'white';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'black';
                const textX = el.x * (canvas.width / 500); // Scale X position
                const textY = el.y * (canvas.height / (500 / aspectRatio)); // Scale Y position
                ctx.strokeText(el.text, textX, textY);
                ctx.fillText(el.text, textX, textY);
            });
        };
    }, [meme, textElements, ref]);

    return <canvas ref={ref} style={{ display: 'none' }} />;
});

export default MemeCanvas;
