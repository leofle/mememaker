import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Main, 
    AddTextButton,
    RemoveTextButton,
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

  useEffect(() => {
    const fetchMemes = async () => {
      const result = await axios(
        `https://api.imgflip.com/get_memes`
      );
      setMemes(result.data.data.memes);
    };
    fetchMemes();
  }, []);

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
            </FlexContainer>
        </ToolBar>
        <Container>
        {selectedMeme && (
            <SelectedMeme>
            <MemeImage src={selectedMeme.url} alt={selectedMeme.name} />
            {textInputs.map((input, index) => (
                <DraggText
                    key={index}
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
            <p>Export</p>
        </OtherTools>
      </FlexContainer>
      <div>
        {console.log(active)}
      </div>
    </Main>
  );
};

export default MainSection;
