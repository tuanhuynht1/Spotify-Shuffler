import React from 'react';

export const ArtistItem = ({artist}) => {
  
    
    return(
        <div className='artists-item'>
            {
                artist.image 
                ? <img src={artist.image.url} alt={artist.name + ' thumbnail'} width='100px' height='100px'/> 
                : <span></span>
            }
            <h2>{artist.name}</h2>
            <p>Popularity: {artist.popularity}</p>
        </div>
    )
}