import React, {useContext} from 'react';

export const BeginBttn = ({setShuffleMode}) => {
  
    return(
        <button onClick={() => setShuffleMode(true) } className='begin-bttn'>Begin</button>
    )
}   