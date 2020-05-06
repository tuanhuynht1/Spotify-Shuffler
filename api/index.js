const querystring = require('querystring');
const request = require('request');

const {parseArtists} = require('../helpers/SpotifyParser');

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.REDIRECT_URI;

require('dotenv').config();

const router = require('express').Router()

router.get('/login', (req, res) => {
	// scope defines what app can access, add streaming scope for premium
	const scope = 'user-read-private user-read-email user-read-playback-state';
	res.redirect(
		'https://accounts.spotify.com/authorize?' +
			querystring.stringify({
				response_type: 'code',
				client_id: client_id,
				scope: scope,
				redirect_uri: redirect_uri,
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
				'http://localhost:3000/?' +
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
})

module.exports = router;