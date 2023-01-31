import { OtherTools } from '../styles';

const RightPanel = ( { canvasRef, selectedMeme } ) => {
    return (
        <OtherTools>
          <p>Preview</p>
          <canvas ref={canvasRef} 
            width={selectedMeme ? selectedMeme.width : 0}
            height={selectedMeme ? selectedMeme.height : 0}
          />
        </OtherTools>
    );
}

export default RightPanel;