import React from 'react';
import { Rnd } from 'react-rnd';

const DraggText = ({ children, onDrop }) => {
    
    return (
        <Rnd
        default={{
            x: 0,
            y: 0
            }}
            bounds="parent"
            onDragStop={(e, d) => {
                onDrop(e, d);
            }}
        >
        { children } 
        </Rnd>
    );
    }

export default DraggText;