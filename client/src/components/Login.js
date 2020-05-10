import React, {useContext} from 'react';
import axios from 'axios';
import {GlobalContext} from '../GlobalContext';

export const Login = () => {

    const {setToken, setUser} = useContext(GlobalContext);

    const guestSignIn = () => {
        setUser('guest');
        axios
        .get('/api/token')
        .then(res => {
            console.log(res.data.access_token)
            setToken(res.data.access_token)
        })
        .catch(e => console.error(e))
    }

    return (
        <div className='login-container'>
            <h1>Spotify Shuffler</h1>
            <a href='http://spotify-magic-herokuapp.com/api/login'>sign in with spotify</a>
            <p onClick={guestSignIn}>sign in as a guest</p>
        </div>
    )
}
