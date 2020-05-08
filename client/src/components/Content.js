import React, {useState, useContext, useEffect} from 'react';
import {SearchContent} from './SearchContent';
import {ShuffleContent} from './ShuffleContent';
import {GlobalContext} from '../GlobalContext';
import axios from 'axios';

export const Content = () => {

    // switch to shuffle mode after selecting artist and pressing the begin button
    const [shuffleMode, setShuffleMode] = useState(false);

    const { setUser, token } = useContext(GlobalContext);

    useEffect(() => {
        axios
        .get('/api/user', {
            headers: {
                Token: token    
            }
        })
        .then( res => {
            setUser(res.data);
            console.log(res.data);
        })
        .catch(e => console.error(e));
    }, [token]);

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
