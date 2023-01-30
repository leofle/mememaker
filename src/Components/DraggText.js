import React from 'react';
import { Rnd } from 'react-rnd';

const DraggText = ({ children, onDrag }) => {
    
    return (
        <Rnd
        default={{
            x: 0,
            y: 0
            }}
            size={{
                width: 'auto',
                height: 'auto'
            }}
            bounds="parent"
            onDragStop={(e, d) => {
                onDrag(d.x, d.y);
            }}
        >
        { children } 
        </Rnd>
    );
    }

export default DraggText;