import React, {useState, useEffect} from 'react';

export const Pick = ({song, index, setLockStatus}) => {
    
    const [locked, setLocked] = useState(song.locked)

    useEffect(() => {
        setLocked(song.locked)
    }, [song])

    const color = locked ? {color:'red'} : {color:'black'};

    return(
        <div> 
            <img src={song.image.url}  width='100px' alt={song.name}/> 
            <span style={color}>{song.name}</span>
            {
                locked 
                    ? <button onClick={() => {setLockStatus(index, false); setLocked(false)} }>unlock</button>
                    : <button onClick={() => {setLockStatus(index, true); setLocked(true)} }>lock</button>
            } 
        </div>
    )
}