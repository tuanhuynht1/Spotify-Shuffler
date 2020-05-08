const express = require('express'); // Express web server framework
require('dotenv').config();


const app = express();
const apiRouter = require('./api');

app
.use(express.static(__dirname + '/client/build')) // run React app
.use(express.json())
.use('/api', apiRouter)	

// All routes get handled by React
app.get('*', function (req, res) {
	res.sendFile(__dirname + '/client/build/index.html');
});

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening to port ${port}`));
