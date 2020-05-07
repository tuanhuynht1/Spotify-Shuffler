import React, {Fragment, useState, useContext, useEffect} from 'react';
import {GlobalContext} from '../GlobalContext';

export const ShuffleContent = () => {
    const playlist_size = 6;
    const {tracks, setTracks} = useContext(GlobalContext);
    const [spots, setSpots] = useState([]);

    const pickRandom = () => {
        // pick a random album
        let album_index = Math.floor(Math.random() * tracks.length);
        // pick a random track in that album
        let track_index = Math.floor(Math.random() * tracks[album_index].tracks.length);

        const newSpot = {
            name: tracks[album_index].tracks[track_index].name,
            id: tracks[album_index].tracks[track_index].id,
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

        return newSpot;
    }

    const shuffle = () => {
        // filter out any spot that's not locked
        let locked_picks = spots.filter(spot => spot.locked);
        let new_picks = [];
        for (let i = 0; i < (playlist_size - locked_picks); i++){
            if (tracks.length !== 0){
                new_picks.push(pickRandom());
            }
        }
        setSpots(locked_picks.concat(new_picks));
    }

    // initial shuffle
    useEffect(() => {
        let initialSpots = [];
        for (let i = 0; i < 6; i++){
            // if there are songs left, pick a random song to fill initial spots
            if (tracks.length === 0){
                break;
            }
            initialSpots.push(pickRandom());
        }
        setSpots(initialSpots);
    }, []);

    // console.log(spots);

    return (
        <Fragment>
            <button onClick={shuffle}>Shuffle</button>
            {spots.map( song => <p key={song.id}> <img src={song.image.url}  width='200px' alt={song.name}/> {song.name} </p>)}
        </Fragment>
    )   
}
