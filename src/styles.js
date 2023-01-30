import styled from 'styled-components';

import { createGlobalStyle } from 'styled-components'

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
margin-right: 20px;
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
img {
    width: 100%;
    height: auto;
    max-width: 500px;
}    
`;

const TextInput = styled.input`
font-size: 36px;
text-shadow: 5px 5px 5px black;
text-transform: uppercase;
text-align: center;
color: white;
font-weight: bold;
padding: 10px;
background-color: transparent;
border: 1px solid black;
position: absolute;
`;

const Container = styled.div`
position: relative;
display: flex;
flex-direction: column;
align-items: center;
`;

const AddTextButton = styled.button`
  margin-top: 20px;
`;

const RemoveTextButton = styled.button`
    margin-top: 20px;
`;

const FlexContainer = styled.div`
    display: flex;
    flex-direction: ${props => props.row ? 'row' : 'column'};
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    border-radius: 5px;
    padding: 10px;
`;

const ToolBar = styled.div`
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
    FlexContainer,
    ToolBar,
    OtherTools
}