import React, {useState, createContext} from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {

    const [token, setToken] = useState('');
    const [artists, setArtists] = useState([]);
    

    return (
        <GlobalContext.Provider 
        value={{
            token: token,
            setToken: setToken,
            artists: artists,
            setArtists: setArtists
        }}>
            {props.children}
        </GlobalContext.Provider>
    );
}