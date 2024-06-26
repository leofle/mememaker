import React, { useState, useRef } from 'react';
import MemeGallery from './Components/MemeGallery';
import DraggableText from './Components/DraggableText';
import Toolbar from './Components/ToolBar';
import MemeCanvas from './Components/MemeCanvas';
import { Main, Container, SelectedMeme, FlexContainer, ToolBarStyle } from './styles';

const App = () => {
    const [memes, setMemes] = useState([]);
    const [selectedMeme, setSelectedMeme] = useState(null);
    const [textElements, setTextElements] = useState([]);
    const canvasRef = useRef(null);
    const [textCount, setTextCount] = useState(1);

    const addTextElement = () => {
        const newText = `Text #${textCount}`;
        setTextElements([...textElements, { id: textElements.length, x: 50, y: 50, text: newText }]);
        setTextCount(textCount + 1);
    };

    const removeTextElement = () => {
        setTextElements(textElements.slice(0, -1));
        if (textCount > 1) {
            setTextCount(textCount - 1);
        }
    };

    const updateTextPosition = (id, x, y) => {
        setTextElements(
            textElements.map(el => el.id === id ? { ...el, x, y } : el)
        );
    };

    const updateTextContent = (id, text) => {
        setTextElements(
            textElements.map(el => el.id === id ? { ...el, text } : el)
        );
    };

    const exportImage = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const image = new Image();
        image.crossOrigin = "Anonymous";
        const imageUrl = `https://corsproxy.io/?${encodeURIComponent(selectedMeme.url)}`;
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
                ctx.lineWidth = 4;
                ctx.strokeStyle = 'black';
                const textX = el.x * (canvasWidth / 500); // Scale X position
                const textY = el.y * (canvasHeight / (500 / aspectRatio)); // Scale Y position
                ctx.strokeText(el.text, textX + 100, textY + 30);
                ctx.fillText(el.text, textX + 100, textY + 30);
            });
            const dataURL = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = dataURL;
            link.download = 'meme.png';
            link.click();
        };
    };

    return (
        <Main>
            <MemeGallery setSelectedMeme={setSelectedMeme} setMemes={setMemes} memes={memes} />
            {selectedMeme && (
                <FlexContainer row>
                    <Container>
                        <SelectedMeme>
                            <img src={selectedMeme.url} alt="selected meme" style={{ width: '500px', height: 'auto' }} />
                            {textElements.map(el => (
                                <DraggableText key={el.id} id={el.id} x={el.x} y={el.y} text={el.text} updatePosition={updateTextPosition} updateContent={updateTextContent} />
                            ))}
                        </SelectedMeme>
                        <MemeCanvas ref={canvasRef} meme={selectedMeme} textElements={textElements} />
                    </Container>
                    <ToolBarStyle>
                        <Toolbar addText={addTextElement} removeText={removeTextElement} exportImage={exportImage} />
                    </ToolBarStyle>
                </FlexContainer>
            )}
        </Main>
    );
};

export default App;
