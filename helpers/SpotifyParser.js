function parseArtists (response){
    let artists = response.artists.items;
    // console.log(artists);
    let list = [];
    for (let i = 0; i < artists.length; i++){

        // choose most recent image if available
        const image = artists[i].images.length ? artists[i].images[0] : null;

        list.push({
            name: artists[i].name,
            id: artists[i].id,
            popularity: artists[i].popularity,
            image: image
        });
    }
    return list;
}

function parseAlbums (response){
    let albums = response.items;
    // console.log(artists);
    let list = [];
    for (let i = 0; i < albums.length; i++){

        // don't add duplicate albums with different ids
        if(!list.some(album => album.name === albums[i].name)){
            list.push({
                name: albums[i].name,
                id: albums[i].id,
                image: albums[i].images[0]
            });
        }

    }
    return list;
}

function parseTopTracks (response){
    let tracks = response.tracks;
    // console.log(artists);
    let list = [];
    for (let i = 0; i < tracks.length; i++){

        list.push({
            name: tracks[i].name,
            id: tracks[i].id,
            preview_url: tracks[i].preview_url,
        });
    }
    return list;
}

function parseTracks (response){
    let tracks = response.items;
    // console.log(artists);
    let list = [];
    for (let i = 0; i < tracks.length; i++){


        list.push({
            name: tracks[i].name,
            id: tracks[i].id,
            uri: tracks[i].uri
        });
    }
    return list;
}


module.exports = {parseArtists, parseTopTracks, parseAlbums, parseTracks};
