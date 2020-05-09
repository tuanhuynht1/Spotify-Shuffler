import React, {useContext} from 'react';
import {Artists} from './Artists';
import {BeginBttn} from './BeginBttn';
import {GlobalContext} from '../GlobalContext';

export const SearchContent = ({setShuffleMode}) => {

    const {artists, fetchIDs} = useContext(GlobalContext);

    return (
        <div className='search-content-container'>
            {   // don't render begin button if no artist has been selected
                artists.length === 0 
                    ? <h1>Add Your Favorite Artists And Begin!</h1>  
                    // display loading icon if there's pending request from spotify 
                    : fetchIDs.length > 0
                        ? <p style={{color:'red'}}>fetching data...</p>
                        // if all tracks are loaded, present begin button
                        : <BeginBttn setShuffleMode={setShuffleMode}/>
            }
            <Artists />
        </div>
    )
}
