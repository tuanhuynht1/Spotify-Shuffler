import React, {useContext} from 'react';
import {GlobalContext} from '../GlobalContext';
import axios from 'axios';

export const SearchItem = ({artist}) => {

    const {token, artists,setArtists, setTracks, setFetchIDs} = useContext(GlobalContext);

    const onSelect =() => {
        // add id to the fetch queue, add artist to artist list
        setFetchIDs(prev =>  [...prev, artist.id] );
        setArtists(prev => [artist, ...prev]);
        
        // get all albums from artist 
        axios
        .get(`api/albums-by-artist/${artist.id}?useParser=true`,{
            headers: {
                Token: token    
            }
        })
        .then( async res => {
            const albums = res.data;
            let promises = [];
            for (let i = 0; i < albums.length; i++){
                promises.push(axios.get(`api/tracks-by-album/${albums[i].id}?useParser=true`,{
                    headers: {
                        Token: token    
                    }
                }));
            }
            // get all tracks from each album
            await Promise.all(promises)
            .then( res => {
                for (let i = 0; i < res.length; i++){
                    let newTracks = {
                        album: albums[i].name,
                        image: albums[i].image,
                        artist_id: artist.id,
                        tracks: res[i].data
                    }
                    setTracks(prev => [...prev,newTracks]);
                }
            })
            .catch(e => console.error(e));
            // once results come back, remove from fetch queue
            setFetchIDs(prev =>  prev.filter( id => id !== artist.id) );
        })
        .catch(e => console.error(e));
    }

    // console.log(tracks)

    // if the artist has already been picked or the max number of artists have been chosen, render item as blocked
    if(artists.some(a => a.id === artist.id) || artists.length > 9){
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
