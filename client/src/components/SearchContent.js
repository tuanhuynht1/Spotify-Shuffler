import React, {Fragment, useContext} from 'react';
import {Search} from './Search';
import {Artists} from './Artists';
import {BeginBttn} from './BeginBttn';
import {GlobalContext} from '../GlobalContext';

export const SearchContent = ({setShuffleMode}) => {

    const {artists, fetchIDs} = useContext(GlobalContext);

    return (
        <Fragment>
            <Search />
            {   // don't render begin button if no artist has been selected
                artists.length === 0 
                    ? <div></div>
                    // display loading icon if there's pending request from spotify 
                    : fetchIDs.length > 0
                        ? <p style={{color:'red'}}>fetching data...</p>
                        // if all tracks are loaded, present begin button
                        : <BeginBttn setShuffleMode={setShuffleMode}/>
            }
            <Artists />
        </Fragment>
    )
}
