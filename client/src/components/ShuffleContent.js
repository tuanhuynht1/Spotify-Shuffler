import React, {Fragment, useState, useContext, useEffect} from 'react';
import {GlobalContext} from '../GlobalContext';

export const ShuffleContent = () => {

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

        // fill in a new spot
        setSpots(prev => [... prev, newSpot]);

        // remove track from tracklist once picked
        let temp = tracks;
        temp[album_index].tracks.splice(track_index,1);
        // remove album if all tracks from that album has been picked
        if(temp[album_index].tracks.length === 0){
            temp.splice(album_index,1);
        }
        setTracks(temp);
    }

    useEffect(() => {
        for (let i = 0; i < 6; i++){
            pickRandom();
        }
    }, []);

    console.log(spots);

    return (
        <Fragment>
            Shuffle
        </Fragment>
    )
}
