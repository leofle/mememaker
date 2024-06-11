import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
    height: 100%;
  }
  body  {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid gray;
  margin-bottom: 20px;
  width: 500px;
`;

const Gallery = styled.section`
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
  flex-direction: column;
  width: 100%;
  height: 150px;
  margin-bottom: 20px;
`;

const MemeItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const MemeImage = styled.img`
  width: 150px;
  height: 150px;
`;

const MemeName = styled.span`
  font-size: 14px;
  margin-top: 10px;
`;

const SelectedMeme = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  position: relative;  // Ensure relative positioning
  img {
    width: 100%;
    height: auto;
    max-width: 500px;
  }
`;

const TextInput = styled.input`
  font-size: 16px;
`;

const ResizableDraggableElement = styled.div`
  position: absolute;
  z-index: 999;
  font-size: 24px;
  text-shadow: 5px 5px 5px black;
  text-transform: uppercase;
  text-align: center;
  color: white;
  font-weight: bold;
  background-color: transparent;
  border: 1px dotted gray;
  margin: 0;
  text-size-adjust: auto;
  box-sizing: border-box;
  width: auto;

  input {
    font-size: 30px;
    padding: 5px;
    text-align: center;
    background: transparent;
    border: none;
    color: white;
    width: 100%;
    box-sizing: border-box;
    text-transform: uppercase;
    text-shadow: 2px 2px 4px #000000;
    outline: none; /* Remove default outline */
    box-shadow: none; /* Remove default box-shadow */
  }

  input:focus {
    outline: none;
    box-shadow: none;
    border: none;
  }
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AddTextButton = styled.button`
  margin-top: 10px;
`;

const RemoveTextButton = styled.button`
  margin-top: 10px;
`;

const SaveImageButton = styled.button`
  margin-top: 10px;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${props => props.row ? 'row' : 'column'};
  justify-content: space-between;
  align-items: flex-start;  // Align items to start for better layout
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 5px;
  padding: 10px;
`;

const ToolBarStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;  // Align buttons to start
  align-items: center;
  width: auto;
  height: auto;
  background-color: #ffffff;
  border-radius: 5px;
  padding: 10px;
  margin-left: 20px;  // Add some margin to the left to separate from the canvas
`;

const OtherTools = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 30%;
  height: auto;
  background-color: #ffffff;
  border-radius: 5px;
  padding: 10px;
  margin: 10px; 
  flex-grow: 1;
  canvas {
    width: 500px;
    height: auto;
  }
`;

export {
  GlobalStyle,
  Main,
  SearchInput,
  Gallery,
  MemeItem,
  MemeImage,
  MemeName,
  SelectedMeme,
  TextInput,
  Container,
  AddTextButton,
  RemoveTextButton,
  SaveImageButton,
  FlexContainer,
  ToolBarStyle,
  OtherTools,
  ResizableDraggableElement
};
