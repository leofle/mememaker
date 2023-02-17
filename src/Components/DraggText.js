import React, { useEffect } from 'react';
import { Rnd } from 'react-rnd';

const DraggText = ({ children, onDrop, getPosition }) => {
    useEffect(() => {

    }, []);

    return (
        <Rnd
        default={{
            x: 0,
            y: 0
            }}
            bounds="parent"
            onDragStart={(e, d) => {
                getPosition(e);
            }}
            onDragStop={(e, d) => {
                onDrop(e, d);
            }}
        >
        { children } 
        </Rnd>
    );
    }

export default DraggText;