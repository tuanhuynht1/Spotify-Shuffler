import React, {useState, createContext} from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {

    const [token, setToken] = useState('');
    const [artists, setArtists] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [fetchIDs, setFetchIDs] = useState([]);

    return (
        <GlobalContext.Provider 
        value={{
            token: token,
            setToken: setToken,
            artists: artists,
            setArtists: setArtists,
            tracks: tracks,
            setTracks: setTracks,
            fetchIDs: fetchIDs,
            setFetchIDs: setFetchIDs,
        }}>
            {props.children}
        </GlobalContext.Provider>
    );
}