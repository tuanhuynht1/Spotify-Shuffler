import React, {useState} from 'react';
import {SearchContent} from './SearchContent';
import {ShuffleContent} from './ShuffleContent';

export const Content = () => {

    // switch to shuffle mode after selecting artist and pressing the begin button
    const [shuffleMode, setShuffleMode] = useState(false);

    return (
        <div className='main-content'>
            {
                shuffleMode 
                ? <ShuffleContent/>
                : <SearchContent setShuffleMode={setShuffleMode}/>
            }
        </div>
    )
}
