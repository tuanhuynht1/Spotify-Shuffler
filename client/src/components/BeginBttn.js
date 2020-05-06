import React from 'react';
// import {GlobalContext} from '../GlobalContext';
// import axios from 'axios';

export const BeginBttn = () => {
  


    const onClick = () => {
        console.log('now!')
    }

    return(
        <button onClick={onClick} className='begin-bttn'>Begin</button>
    )
}