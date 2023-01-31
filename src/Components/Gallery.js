import React, { useState } from "react";
import { Gallery, Container, SearchInput, MemeImage, MemeItem, MemeName } from "../styles";

const MemeGallery = ({ memes, handleMemeSelection }) => {
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <Container>
        <SearchInput 
            placeholder="Search for a meme" 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
        />
        <Gallery>
            {memes
            .filter(meme => meme.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map(meme => (
                <MemeItem key={meme.id} onClick={() => handleMemeSelection(meme)}>
                <MemeImage src={meme.url} alt={meme.name} />
                <MemeName>{meme.name}</MemeName>
                </MemeItem>
            ))}
        </Gallery>
        </Container>
    );
    }

export default MemeGallery;