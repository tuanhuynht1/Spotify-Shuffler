const querystring = require('querystring');
const request = require('request');

const {parseArtists, parseAlbums, parseTracks} = require('../helpers/SpotifyParser');

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;

require('dotenv').config();

const router = require('express').Router()

// request server to server acess token from spotify, returns json body with access_token object inside 
router.get('/token', (req,res) => {
    // configure request to spotify
    const options  = {
        'method': 'POST',
        'url': 'https://accounts.spotify.com/api/token',
        'headers': {
          'Authorization': 'Basic ' + new Buffer.from(client_id + ':' + client_secret).toString('base64'),
        },
        form: {
          'grant_type': 'client_credentials'
        }
    };
    // make request to spotify
    request(options , (error,response) => { 
        if (!error && response.statusCode === 200) {
            // send object -> {access_token, type, scope, expire_in}
            res.send(JSON.parse(response.body));
        }
        else{
            res.status(response.statusCode).send({error: response.statusMessage});
        }
    });
})

router.get('/login', (req, res) => {
	// scope defines what app can access, add streaming scope for premium
	const scope = 'playlist-modify-public user-read-private user-read-email user-read-playback-state streaming';
	res.redirect(
		'https://accounts.spotify.com/authorize?' +
			querystring.stringify({
				response_type: 'code',
				client_id: client_id,
				scope: scope,
                redirect_uri: redirect_uri,
                show_dialog	: true,
			})
	);
});

router.get('/callback', (req, res) => {
	const code = req.query.code || null;

	const authOptions = {
		url: 'https://accounts.spotify.com/api/token',
		form: {
			code: code,
			redirect_uri: redirect_uri,
            grant_type: 'authorization_code',
		},
		headers: {
			Authorization: 'Basic ' + new Buffer.from(client_id + ':' + client_secret).toString('base64'),
		},
		json: true,
	};

	request.post(authOptions, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			const access_token = body.access_token;
			const refresh_token = body.refresh_token;

			// we can also pass the token to the browser to make requests from there
			res.redirect(
				'/?' +
					querystring.stringify({
						access_token: access_token,
						refresh_token: refresh_token,
					})
			);
		} 
		else {
			res.redirect(
				'/?' +
					querystring.stringify({
						error: 'invalid_token',
					})
			);
		}
	});
});

router.get('/refresh', (req, res) => {
    // requesting access token from refresh token
    let refresh_token = req.query.refresh_token;
    let authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: { 'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')) },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      },
      json: true
    };
  
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        let access_token = body.access_token;
        res.send({
          'access_token': access_token
        });
      }
    });
});

router.get('/user', (req,res) =>{
    // configure spotify request
    const token = req.header('Token');
    const options = {
        'method': 'GET',
        'url': 	'https://api.spotify.com/v1/me',
        'headers': {
          'Authorization': 'Bearer ' + token
        }
    };
    // request user info based on their request token
    request(options, function (error, response) { 
        if (!error && response.statusCode === 200) {
            // send the whole body
            res.send(JSON.parse(response.body));    
        }
        else{
            res.status(response.statusCode).send({error: response.statusMessage});
        }
    });
});

router.get('/artist', (req,res) =>{
    const { artist, useParser } = req.query;
    if(!artist){res.status(400).send({error:'require artist to search'})}

    // configure spotify request
    const token = req.header('Token');
    const options = {
        'method': 'GET',
        'url': `https://api.spotify.com/v1/search?q=${artist}&type=artist&limit=3`,
        'headers': {
          'Authorization': 'Bearer ' + token
        }
    };
    // request all artist info that matches the artist query
    request(options, function (error, response) { 
        if (!error && response.statusCode === 200) {
            if (useParser){
                // if useParser = true, return [ ... { name,id,popularity,image}]
                res.send(parseArtists(JSON.parse(response.body)));
            }
            else{
                // send the whole body
                res.send(JSON.parse(response.body));
            }
        }
        else{
            res.status(response.statusCode).send({error: response.statusMessage});
        }
    });
});

router.get('/albums-by-artist/:id', (req,res) =>{
	const { id } = req.params;
	const { useParser } = req.query;
    if(!id){res.status(400).send({error:'require artist id!'})}

    // configure spotify request
    const token = req.header('Token');
    const options = {
        'method': 'GET',
        'url': `https://api.spotify.com/v1/artists/${id}/albums`,
        'headers': {
          'Authorization': 'Bearer ' + token
        }
	};
	
    // request all albums that matches the artist query
    request(options, function (error, response) { 
        if (!error && response.statusCode === 200) {
            if (useParser === 'true'){
                // if useParser = true, return [ ... { name,id,popularity,image}]
                res.send(parseAlbums(JSON.parse(response.body)));
            }
            else{
                // send the whole body
                res.send(JSON.parse(response.body));
            }
        }
        else{
            res.status(response.statusCode).send({error: response.statusMessage});
        }
	});
});

router.get('/tracks-by-album/:id', (req,res) =>{
	const { id } = req.params;
	const { useParser } = req.query;
    if(!id){res.status(400).send({error:'require album id!'})}

    // configure spotify request
    const token = req.header('Token');
    const options = {
        'method': 'GET',
        'url': `https://api.spotify.com/v1/albums/${id}/tracks`,
        'headers': {
          'Authorization': 'Bearer ' + token
        }
	};
	
    // request all albums that matches the artist query
    request(options, function (error, response) { 
        if (!error && response.statusCode === 200) {
            if (useParser === 'true'){
                // if useParser = true, return [ ... { name,id,popularity,image}]
                res.send(parseTracks(JSON.parse(response.body)));
            }
            else{
                // send the whole body
                res.send(JSON.parse(response.body));
            }
        }
        else{
            res.status(response.statusCode).send({error: response.statusMessage});
        }
	});
});

router.post('/create-playlist/:id', (req,res) =>{
	const { id } = req.params;
    if(!id){res.status(400).send({error:'require user id!'})}

    // configure spotify request
    const token = req.header('Token');
    const options = {
        'method': 'POST',
        'url': `https://api.spotify.com/v1/users/${id}/playlists`,
        'headers': {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body) // name, description, public
    };
    // spotify:track:7stcuQtnHL7C6XdPvpwywv,spotify:track:312WNtMs3F28cUukaPY9bo,spotify:track:1opARDDYaOeE1QUdwXmBGu
    // post and return playlist creation detail
    request(options, function (error, response) { 
        if (!error && response.statusCode === 201) {
            res.send(JSON.parse(response.body));
        }
        else{
            res.status(response.statusCode).send({error: response.statusMessage});
        }
	});
});

router.post('/playlist/:id', (req,res) =>{
    const { id } = req.params
    if(!id){res.status(400).send({error:'require user id!'})}

    // comma separated uris
    const uris = querystring.stringify(req.body);
    const token = req.header('Token');
    const options = {
        'method': 'POST',
        'url': `https://api.spotify.com/v1/playlists/${id}/tracks?${uris}`,
        'headers': {
            'Authorization': 'Bearer ' + token
        }
    };

    // post and return playlist snapshot id
    request(options, function (error, response) { 
        if (!error && response.statusCode === 201) {
            res.send(JSON.parse(response.body));
        }
        else{
            res.status(response.statusCode).send({error: response.statusMessage});
        }
	});
});


module.exports = router;