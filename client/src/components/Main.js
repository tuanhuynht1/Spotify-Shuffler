import React, {useContext} from 'react';
import {Search} from './Search';
import {Artists} from './Artists';
import {BeginBttn} from './BeginBttn';
import {GlobalContext} from '../GlobalContext';

export const Main = () => {

    const {artists, fetchIDs} = useContext(GlobalContext);

    return (
        <div className='main-content'>
            <Search />
            { 
                artists.length === 0 
                    ? <div></div>
                    : fetchIDs.length > 0
                        ? <p style={{color:'red'}}>fetching data...</p>
                        : <BeginBttn/>
            }
            <Artists />
        </div>
    )
}
