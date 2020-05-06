import React, {useContext} from 'react';
import {GlobalContext} from '../GlobalContext';
import axios from 'axios';

export const BeginBttn = () => {
  
    const {token, artists} = useContext(GlobalContext);


    const onClick = async () => {

        console.log(artists);

        // get albums for each artist
        let albums = [];
        for (let i = 0; i < artists.length; i++){
            await axios
            .get(`api/albums-by-artist/${artists[i].id}?useParser=true`,{
                headers: {
                    Token: token    
                }
            })
            .then(res => {
                albums.push(res.data);
                console.log('albums:',albums);
            })
            .catch(e => console.error(e));
        }
        albums = albums.flat();

        let tracks = [];
        for (let i = 0; i < albums.length; i++){
            await axios
            .get(`api/tracks-by-album/${albums[i].id}?useParser=true`,{
                headers: {
                    Token: token    
                }
            })
            .then( res => {
                console.log(res.data);
            })
            .catch(e => console.error(e));
        }
        
    }

    return(
        <button onClick={onClick} className='begin-bttn'>Begin</button>
    )
}