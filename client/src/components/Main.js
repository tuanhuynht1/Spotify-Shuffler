import React from 'react';
import {Search} from './Search'
import {Artists} from './Artists'

export const Main = () => {
    return (
        <div className='main-content'>
            <Search />
            <Artists />
        </div>
    )
}
