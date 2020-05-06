import React, { useContext } from 'react';
import {GlobalContext} from '../GlobalContext';
import {ArtistItem} from './ArtistItem';

export const Artists = () => {
  
    const {artists} = useContext(GlobalContext);
    
    return(
        <div className='artists-showcase'>
            {
                artists.map( a => <ArtistItem artist={a} key={a.id}/>)
            }
        </div>
    )
}
