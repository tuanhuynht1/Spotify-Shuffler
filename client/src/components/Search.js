import React, {useState, useContext} from 'react';
import qs from 'querystring'
import axios from 'axios';
import {GlobalContext} from '../GlobalContext'
import {SearchItem} from './SearchItem'

export const Search = () => {

    // keep track of current search results
    const [results, setResults] = useState([]);
    const {token, setToken} = useContext(GlobalContext);

    const onType = (e) => {
        // make sure field not empty, if so, clear out results
        if (e.target.value.trim() === ''){
            setResults([]);
        }
        else{
            // pass query into get call
            const query = qs.stringify({
                artist: e.target.value,
                useParser: 'true'
            });
            // get artist that matches search query
            axios
            .get(`api/artist?${query}`,{
                headers: {
                    Token: token
                }
            })
            // set search results
            .then(res => setResults(res.data))
            .catch(e => {
                // unauthorized
                if (e.response.status === 401){
                    // refresh token
                    const params = new URLSearchParams(window.location.search);
                    const refresh = params.get('refresh_token');
                    axios
                    .get(`/api/refresh?refresh_token=${refresh}`)
                    .then(res => {
                        setToken(res.data.access_token);
                    })
                };
            });
        }
    }

    return (
        <div className='search-container'>
             {/* search bar */}
            <input id='search-bar' placeholder='Add artist...' onChange={onType} autoComplete='off'/>
            <div className='search-items'>
                {/* for each result in current search (if search bar not empty) render the search result as dropdown */}
                { document.getElementById('search-bar') && document.getElementById('search-bar').value.trim() !== '' 
                ? results.map( artist=> <SearchItem artist={artist} key={artist.id}/>)
                : <div></div>
                }
            </div>

        </div>
    )
}
