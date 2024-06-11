import React from 'react';
import { ToolBarStyle, FlexContainer, AddTextButton, RemoveTextButton, SaveImageButton } from '../styles';

const Toolbar = ({ addText, removeText, exportImage }) => {
    return (
        <ToolBarStyle>
            <FlexContainer row>
                <AddTextButton onClick={addText}>Add Text</AddTextButton>
                <RemoveTextButton onClick={removeText}>Remove Text</RemoveTextButton>
                <SaveImageButton onClick={exportImage}>Save Image</SaveImageButton>
            </FlexContainer>
        </ToolBarStyle>
    );
};

export default Toolbar;
