import React, {Fragment, useState, useContext} from 'react';
import {GlobalContext} from '../GlobalContext';
import axios from 'axios';

export const PlaylistModal = ({songs, guest}) => {

    const modal = document.getElementById("playlist-modal");
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [loading,setLoading] = useState(false);
    const {user, token} = useContext(GlobalContext);

    const openModal = () => {
        modal.style.display = "block";
    }

    const closeModal = () => {
        modal.style.display = "none";
        if (user !== 'guest'){
            document.getElementById('name').value = '';
            document.getElementById('desc').value = '';
            setName('');
            setDescription('');
            setLoading(false);
        }
    }

    const save = () => {
        setLoading(true);
        axios
        .post(`/api/create-playlist/${user.id}`,{
            name: name,
            description: description
        },{
            headers: {
                Token: token    
            }
        })
        .then( res => {
            const playlist_id = res.data.id;
            const url = res.data.external_urls.spotify;
            const uris = songs
                .filter(song => song.locked)            // filter songs that are locked
                .map(song => song.uri)                  // return only their uris
                .reduce((uris,uri) => uris + ',' + uri) // combine uris into a comma separated string
                

            console.log(playlist_id, url);
            axios
            .post(`api/playlist/${playlist_id}`,{
                uris: uris
            },{
                headers: {
                    Token: token    
                }
            })
            .then( () => {
                closeModal();
                window.open(url, '_blank');
            } )
            .catch(e => console.error(e))
        })
        .catch(e => console.error(e));
    }

    return (
        <Fragment>
            {/* <!-- Trigger/Open The Modal --> */}
            <button id="playlist-save-bttn" onClick={openModal}>Save to playlist</button>

            {/* <!-- The Modal --> */}
            <div id="playlist-modal" className="modal">

            {/* <!-- Modal content --> */}
            { guest ?
                <div className="playlist-modal-content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <p>Sorry, this feature is not available for guest users. 
                        Sign in with Spotify to save your playlist onto your Spotify Account!</p>
                </div>

                : <div className="playlist-modal-content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <br/>
                    <input id="name" placeholder='Playlist Name' autoComplete='off' onChange={ e => setName(e.target.value)}/>
                    <input id="desc" placeholder='Description' autoComplete='off' onChange={ e => setDescription(e.target.value)}/>
                    { name.trim() !== '' ?
                        loading ? 
                            <p>loading...</p>
                            : <button className='save-bttn' onClick={save}>Save</button>
                        : <button className='save-bttn inactive'>Save</button>
                    }
                </div>
            }
            

            </div>
        </Fragment>
    )
}
