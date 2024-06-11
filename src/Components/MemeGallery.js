import React, { useEffect } from 'react';
import axios from 'axios';
import { Gallery, MemeItem, MemeImage, MemeName } from '../styles';

const MemeGallery = ({ setSelectedMeme, setMemes, memes }) => {
    useEffect(() => {
        const fetchMemes = async () => {
            const result = await axios('https://api.imgflip.com/get_memes');
            setMemes(result.data.data.memes);
        };
        fetchMemes();
    }, [setMemes]);

    return (
        <Gallery>
            {memes.map(meme => (
                <MemeItem key={meme.id} onClick={() => setSelectedMeme(meme)}>
                    <MemeImage src={meme.url} alt={meme.name} />
                    <MemeName>{meme.name}</MemeName>
                </MemeItem>
            ))}
        </Gallery>
    );
};

export default MemeGallery;
