import { ToolBarStyle, FlexContainer, AddTextButton, RemoveTextButton, SaveImageButton } from "../styles";

const ToolBar = ( { handleAddText, handleRemoveText, handleExport }) => {
    return (
        <ToolBarStyle>
            <p>Text Tools</p>
            <FlexContainer row>
                <AddTextButton onClick={handleAddText}>Add Text</AddTextButton>
                <RemoveTextButton onClick={ handleRemoveText }>Remove Text</RemoveTextButton>
                <SaveImageButton onClick={handleExport}>Save Image</SaveImageButton>
            </FlexContainer>
        </ToolBarStyle>
    );
}

export default ToolBar;