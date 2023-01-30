import React from 'react';
import { Rnd } from 'react-rnd';

const DraggText = ({ children }) => {
    
    return (
        <Rnd
        default={{
            x: 40,
            y: 40,
            width: 450,
            height: 71,
            }}
            minWidth={450}
            minHeight={71}
            bounds="parent"
        >
        { children } 
        </Rnd>
    );
    }

export default DraggText;