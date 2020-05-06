import React, {useContext} from 'react';
import {GlobalContext} from '../GlobalContext'

export const SearchItem = ({artist}) => {

    const {artists,setArtists} = useContext(GlobalContext);

    const onSelect = () => {
        setArtists(prev => [...prev, artist]);
        console.log(artists);
    }

    // 
    if(artists.some(a => a.id === artist.id) || artists.length > 2){
        return (
            <div className='search-item blocked'>
                {artist.image 
                    ? <img src={artist.image.url} alt={artist.name + ' thumbnail'} width='30px' height='30px'/> 
                    : <span></span>}
                <span>{artist.name}</span>
            </div>
        )
    }
    else{
        return (
            <div className='search-item' onClick={onSelect}>
                {artist.image 
                    ? <img src={artist.image.url} alt={artist.name + ' thumbnail'} width='30px' height='30px'/> 
                    : <span></span>}
                <span>{artist.name}</span>
            </div>
        )
    }
}
