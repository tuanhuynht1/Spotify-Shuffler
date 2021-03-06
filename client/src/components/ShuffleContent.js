import React, {useState, useContext, useEffect} from 'react';
import {GlobalContext} from '../GlobalContext';
import {Pick} from './Pick';
import {PlaylistModal} from './PlaylistModal';

export const ShuffleContent = ({setShuffleMode}) => {
    const playlist_size = 10;
    const {tracks, setTracks, setArtists, user} = useContext(GlobalContext);
    const [picks, setPicks] = useState([]);

    const pickRandom = () => {
        // pick a random album
        let album_index = Math.floor(Math.random() * tracks.length);
        // pick a random track in that album
        let track_index = Math.floor(Math.random() * tracks[album_index].tracks.length);

        const newPick = {
            name: tracks[album_index].tracks[track_index].name,
            id: tracks[album_index].tracks[track_index].id,
            uri: tracks[album_index].tracks[track_index].uri,
            album: tracks[album_index].album,
            image: tracks[album_index].image,
            locked: false
        }

        // remove track from tracklist once picked
        let temp = tracks;
        temp[album_index].tracks.splice(track_index,1);
        // remove album if all tracks from that album has been picked
        if(temp[album_index].tracks.length === 0){
            temp.splice(album_index,1);
        }
        setTracks(temp);

        return newPick;
    }

    const shuffle = () => {
        // filter out any picks that's not locked
        let locked_picks = picks.filter(pick => pick.locked);
        let new_picks = [];
        for (let i = 0; i < (playlist_size - locked_picks.length); i++){
            if (tracks.length !== 0){
                new_picks.push(pickRandom());
            }
        }
        setPicks(locked_picks.concat(new_picks));
    }

    const setLockStatus = (index, status) => {
        let temp = picks;
        temp[index].locked = status;
        setPicks(temp);
    }

    const reset = () => {
        setTracks([]);
        setArtists([]);
        setShuffleMode(false);
    }

    // initial shuffle
    useEffect(() => {
        let initialpicks = [];
        for (let i = 0; i < playlist_size; i++){
            // if there are songs left, pick a random song to fill initial picks
            if (tracks.length === 0){
                break;
            }
            initialpicks.push(pickRandom());
        }
        setPicks(initialpicks);
    }, []);

    console.log(picks);

    return (
        <div className='shuffle-content-container'>
            
            {/* render picks */}
            <div className='picks-showcase'>
                {picks.map( (song,i) => <Pick song={song} key={i} index={i} setLockStatus={setLockStatus}/>)}
            </div>

            {/* if there available songs to shuffle, render shuffle button */}
            {tracks.length ?
                <button className='shuffle-bttn' onClick={shuffle}>Shuffle</button>
                :<span></span>
            }

            <PlaylistModal songs={picks} guest={user === 'guest'}/>
            <button className='reset-bttn' onClick={reset}>Reset</button>

        </div>
    )   
}
