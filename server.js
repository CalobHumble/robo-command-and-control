// This is our server code, that will run on the remote PI.
// This script uses ExpressJS as our HTTP server

const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = 8080;



// We will use the library Johnny-Five to control our arduino.
// This required your arduino to have installed the "firmata" firmware;
var ARDUINO = false;
var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  ARDUINO = true;
});

// This function tells express to serve anything in the web-client directory at the point "/".
app.use('/', express.static('./web-client'));

// Handle WebSocket connections
io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('controller-update', function(state) {
    // Do things based on the state;\
    if (ARDUINO) {
      let led = new five.Led(13);
      if (state.buttons.x) {
        led.on();
      } else {
        led.off();
      }
    }
    console.log(state);
  })
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

// This functions tells express to start the server, and listen for connections.
http.listen(PORT, () => console.log(`Robo CNC is running on port ${PORT}!`));