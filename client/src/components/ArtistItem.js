import React, {useContext} from 'react';
import {GlobalContext} from '../GlobalContext';

export const ArtistItem = ({artist}) => {
  
    const {setArtists} = useContext(GlobalContext);

    const remove = () => {
        setArtists(prev => prev.filter( a => a.id !== artist.id));
    }

    return(
        <div className='artists-item'>
            {
                artist.image 
                ? <img src={artist.image.url} alt={artist.name + ' thumbnail'} width='100px' height='100px'/> 
                : <span></span>
            }
            <h2>{artist.name}</h2>
            <p>Popularity: {artist.popularity} <button onClick={remove}>Remove</button> </p>
            
        </div>
    )
}