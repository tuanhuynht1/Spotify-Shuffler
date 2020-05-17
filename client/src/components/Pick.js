import React, {useState, useEffect} from 'react';

export const Pick = ({song, index, setLockStatus}) => {
    
    const [locked, setLocked] = useState(song.locked)

    useEffect(() => {
        setLocked(song.locked)
    }, [song])

    const textColor = locked ? {color:'white'} : {color:'black'};
    const bgColor = locked ? {backgroundColor:'var(--spotify-green)', filter: 'brightness(120%)'} : {backgroundColor:'white'};

    return(
        <div className='pick-item' style={bgColor}> 
            { song.image ?
                <img 
                    src={song.image.url}  width='200px' height='200px' alt={song.name}
                    onClick = {locked ? 
                                () => {setLockStatus(index, false); setLocked(false)}
                                : () => {setLockStatus(index, true); setLocked(true)}}
                />
                : <div></div>
            }
            <h2 style={textColor}>{song.name}</h2>
        </div>
    )
}