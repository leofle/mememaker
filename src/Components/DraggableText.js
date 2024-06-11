import React, { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { ResizableDraggableElement } from '../styles';

const DraggableText = ({ id, x, y, text, updatePosition, updateContent }) => {
    const [inputWidth, setInputWidth] = useState(200);

    useEffect(() => {
        setInputWidth(Math.max(200, text.length * 15));
    }, [text]);

    const handleChange = (e) => {
        const upperCaseText = e.target.value.toUpperCase();
        updateContent(id, upperCaseText);
    };

    return (
        <Rnd
            default={{ x: x, y: y }}
            bounds="parent"
            onDragStop={(e, d) => updatePosition(id, d.x, d.y)}
        >
            <ResizableDraggableElement style={{ width: inputWidth }}>
                <input
                    type="text"
                    value={text}
                    onChange={handleChange}
                    style={{
                        fontSize: '30px',
                        padding: '5px',
                        textAlign: 'center',
                        background: 'transparent',
                        border: 'none',
                        color: 'white',
                        width: '100%',
                        boxSizing: 'border-box',
                        textTransform: 'uppercase',
                        textShadow: '2px 2px 4px #000000',
                    }}
                />
            </ResizableDraggableElement>
        </Rnd>
    );
};

export default DraggableText;
