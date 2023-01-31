import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { 
    Main, 
    AddTextButton,
    RemoveTextButton,
    SaveImageButton,
    Container, 
    SearchInput, 
    Gallery, 
    MemeItem, 
    MemeImage, 
    MemeName, 
    SelectedMeme, 
    TextInput, 
    FlexContainer,
    ToolBar,
    OtherTools
} from '../styles';
import DraggText from './DraggText';

const MainSection = () => {
  const [memes, setMemes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [text, setText] = useState('');
  const [textInputs, setTextInputs] = useState([    { x: 10, y: 10, width: 200, height: 50 },  ]);
  const [active, setActive] = useState(0);
  const canvasRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
  };

  useEffect(() => {
    const fetchMemes = async () => {
      const result = await axios(
        `https://api.imgflip.com/get_memes`
        );
        setMemes(result.data.data.memes);
      };
      fetchMemes();

      if (!isExporting) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.src = selectedMeme.url;
      image.onload = () => {
        ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
        ctx.font = "46px Arial Black";
        ctx.shadowColor="black";
        ctx.shadowBlur=15;
        ctx.lineWidth=5;
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "center";
        ctx.textTransform = "uppercase";
        textInputs.forEach(input => {
          ctx.fillText(text.toUpperCase(), input.x, input.y);
        });
        const dataURL = canvas.toDataURL();
        const link = document.createElement("a");
        link.download = "meme.png";
        link.href = dataURL;
        link.click();
        setIsExporting(false);
      };
  }, [isExporting, selectedMeme, textInputs, active, text]);


  const handleMemeSelection = meme => {
    setSelectedMeme(meme);
  };

    const handleAddText = () => {
        setTextInputs([...textInputs, { x: 10, y: 10, width: 200, height: 50 }]);
        setActive(textInputs.length)
    };

    const handleRemoveText = () => {
        setTextInputs(textInputs.splice(0, textInputs.length - 1));
        setActive(textInputs.length - 1)
    };

    const onDrop = (event) => {
      const x = event.clientX;
      const y = event.clientY;
      setTextInputs(textInputs.map((input, i) => {
          if (i === active) {
              return { ...input, x, y };
          }
          return input;
      }));
  };
    
  return (
    <Main>
      <SearchInput 
        placeholder="Search for a meme" 
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <Gallery>
        {memes
          .filter(meme => meme.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map(meme => (
            <MemeItem key={meme.id} onClick={() => handleMemeSelection(meme)}>
              <MemeImage src={meme.url} alt={meme.name} />
              <MemeName>{meme.name}</MemeName>
            </MemeItem>
          ))}
      </Gallery>
      <FlexContainer row>
        <ToolBar>
            <p>Text Tools</p>
            <FlexContainer row>
                <AddTextButton onClick={handleAddText}>Add Text</AddTextButton>
                <RemoveTextButton onClick={ handleRemoveText }>Remove Text</RemoveTextButton>
                <SaveImageButton onClick={handleExport}>Save Image</SaveImageButton>
            </FlexContainer>
        </ToolBar>
        <Container>
        {selectedMeme && (
            <SelectedMeme>
            <MemeImage src={selectedMeme.url} alt={selectedMeme.name} />
            {textInputs.map((input, index) => (
                <DraggText
                    key={index}
                    x={textInputs[active].x} 
                    y={textInputs[active].y} 
                    width={textInputs[active].width} 
                    height={textInputs[active].height} 
                    onDrop={onDrop} 
                >
                    <TextInput
                    key={index}
                    defaultValue={`Text #${index+1}`}
                    value={input.text}
                    onChange={e => setText(e.target.value)}
                    />
                </DraggText>
            ))}
             </SelectedMeme>
        )}
        </Container>
        <OtherTools>
          <p>Preview</p>
          <canvas ref={canvasRef} 
            width={selectedMeme ? selectedMeme.width : 0}
            height={selectedMeme ? selectedMeme.height : 0}
          />
        </OtherTools>
      </FlexContainer>
      <div>
        {console.log(active)}
      </div>
    </Main>
  );
};

export default MainSection;
