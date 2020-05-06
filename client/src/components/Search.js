import React, {useState, useContext} from 'react';
import qs from 'querystring'
import axios from 'axios';
import {GlobalContext} from '../GlobalContext'
import {SearchItem} from './SearchItem'

export const Search = () => {

    const [results, setResults] = useState([]);
    const {token} = useContext(GlobalContext);

    const onType = (e) => {
        if (e.target.value.trim() === ''){
            setResults([]);
        }
        else{
            const query = qs.stringify({
                artist: e.target.value,
                useParser: 'true'
            });
            console.log(query);
            axios
            .get(`api/artist?${query}`,{
                headers: {
                    Token: token
                }
            })
            .then(res => setResults(res.data))
            .catch(e => console.error(e));
        }
    }

    return (
        <div className='search'>
            <input id='search-bar' placeholder='Add artist...' onChange={onType}/>
            { document.getElementById('search-bar') && document.getElementById('search-bar').value.trim() !== '' 
              ? results.map( artist=> <SearchItem artist={artist} key={artist.id}/>)
              : <div></div>
            }
        </div>
    )
}
