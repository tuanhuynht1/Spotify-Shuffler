import React, {useState, useContext, useEffect, Fragment} from 'react';
import {SearchContent} from './SearchContent';
import {ShuffleContent} from './ShuffleContent';
import {GlobalContext} from '../GlobalContext';
import {Search} from './Search';
import axios from 'axios';

export const Content = () => {

    // switch to shuffle mode after selecting artist and pressing the begin button
    const [shuffleMode, setShuffleMode] = useState(false);

    const { user, setUser, token, setToken } = useContext(GlobalContext);

    const signOut = () => {
        setUser('');
        setToken('');
        window.location = '/';
    }

    useEffect(() => {
        if(user !== 'guest'){
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
        }
    }, [token, user, setUser]);

    console.log(user);

    return (
            <Fragment> 
                <span id='sign-out' onClick={signOut}>Sign Out</span>
                { user === 'guest' ?  <span> | Guest User</span> : <span> | {user.email}</span> }
                <Search />
                {
                    shuffleMode ? 
                    <ShuffleContent setShuffleMode={setShuffleMode}/>
                    : <SearchContent setShuffleMode={setShuffleMode}/>
                }
            </Fragment>
    )
}
