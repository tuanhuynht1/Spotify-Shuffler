import React, {useContext} from 'react';
import {GlobalContext} from '../GlobalContext';

export const ArtistItem = ({artist}) => {
  
    const {setArtists, setTracks, fetchIDs} = useContext(GlobalContext);

    const remove = () => {
        setArtists(prev => prev.filter( a => a.id !== artist.id));
        setTracks(prev => prev.filter(album => album.artist_id !== artist.id));
    }

    return(
        <div className='artist-item'>
            <div className='image-container'>
                {artist.image 
                ? <img src={artist.image.url} alt={artist.name + ' thumbnail'} width='250px' height='250px'/> 
                : <span></span>}
                {
                fetchIDs.some(id => id === artist.id) 
                    ? <span></span>
                    : <i className="remove-icon far fa-times-circle fa-2x" onClick={remove} ></i>
                } 
            </div>
            <h2>{artist.name}</h2>
            <h3>
                Popularity: {artist.popularity} 
            </h3>
            
        </div>
    )
}