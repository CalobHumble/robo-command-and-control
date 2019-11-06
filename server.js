// This is our server code, that will run on the remote PI.
// This script uses ExpressJS as our HTTP server

const express = require('express');
const app = express();
const PORT = 8080;

// This function tells express to serve anything in the web-client directory at the point "/".
app.use('/', express.static('./web-client'));

// This functions tells express to start the server, and listen for connections.
app.listen(PORT, () => console.log(`Robo CNC is running on port ${PORT}!`));