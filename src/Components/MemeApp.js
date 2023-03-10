import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Main,
  Container,
  MemeImage,
  SelectedMeme,
  TextInput,
  FlexContainer,
  ResizableDraggableElement
} from "../styles";
import DraggText from "./DraggText";
import MemeGallery from "./Gallery";
import ToolBar from "./ToolBar";
import RightPanel from "./RightPanel";

const MainSection = () => {
  const [memes, setMemes] = useState([]);
  const [selectedMeme, setSelectedMeme] = useState(null);
  const [toptext, setTopText] = useState("");
  const [textInputs, setTextInputs] = useState([
    { x: 10, y: 10, width: 200, height: 50 },
  ]);
  const [active, setActive] = useState(0);
  const canvasRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
  };

  useEffect(() => {
    const fetchMemes = async () => {
      const result = await axios(`https://api.imgflip.com/get_memes`);
      setMemes(result.data.data.memes);
    };
    fetchMemes();
  }, []);

  const handleMemeSelection = (meme) => {
    setSelectedMeme(meme);
  };

  const handleAddText = () => {
    setTextInputs([...textInputs, { x: 10, y: 10, width: 200, height: 50 }]);
    setActive(textInputs.length);
  };

  const handleRemoveText = () => {
    setTextInputs(textInputs.splice(0, textInputs.length - 1));
    setActive(textInputs.length - 1);
  };

  const getPosition = (e) => {
    let rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return { x, y };
  };

  const onDrop = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    setTextInputs(
      textInputs.map((input, i) => {
        if (i === active) {
          return { ...input, x, y };
        }
        console.log(input)
        return input;
      })
    );
  };

  return (
    <Main>
      <MemeGallery memes={memes} handleMemeSelection={handleMemeSelection} />
      <FlexContainer row>
        <ToolBar
          handleAddText={handleAddText}
          handleRemoveText={handleRemoveText}
          handleExport={handleExport}
        />
        <Container>
          {selectedMeme && (
            <SelectedMeme>
              <MemeImage src={selectedMeme.url} alt={selectedMeme.name} />
              {textInputs.map((input, index) => (
                <DraggText
                  key={index}
                  x={textInputs[active].x}
                  y={textInputs[active].y}
                  getPosition={getPosition}
                  onDrop={onDrop}
                >
                  <ResizableDraggableElement>
                    { toptext }
                  </ResizableDraggableElement>
                </DraggText>
              ))}
            </SelectedMeme>
          )}
        </Container>
        <RightPanel 
          canvasRef={canvasRef} 
          selectedMeme={selectedMeme}
          isExporting={isExporting}
          textInputs={textInputs}
          text={toptext}
          setIsExporting={setIsExporting}
        >
        <TextInput
          defaultValue={`Text #1`}
          value={toptext}
          onChange={(e) => setTopText(e.target.value)}
        />
        </RightPanel>
      </FlexContainer>
      <div>{console.log(active)}</div>
    </Main>
  );
};

export default MainSection;
