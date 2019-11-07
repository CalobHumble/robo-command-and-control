// First lets define our controllers states.  For this example, I'll encode
// the four main buttons, the right trigger, and the right joy sticks.
var controller = {
  buttons: {
    x: false,
    circle: false,
    square: false,
    triangle: false,
    right_trigger: false
  },
  // While our buttons can only be "pressed" or "not pressed" we need to store our
  // joy sticks as a vector, split into x and y directions, so we can derive it's location
  joysticks: {
    right: {
      x: 0,
      y: 0
    }
  }
};

// Connect to the websocket.
var socket = io();


// First, let start a loop that detects a controller, then reads it state, and stores it
// in our above object.

function gamepadReadLoop() {
  let gamepads = navigator.getGamepads();
  if (gamepads.length > 0) {
    //We have a bitter!
    let gamepad = gamepads[0];
    // Buttons are stored in an array on gamepad.buttons.
    // It will take trial and error, but by pressing the buttons, and seeing which on changes
    // state, you can determine the pattern of the buttons;

    // These are mapped to a dualshock 4 controller, plugged in via USB
    controller.buttons.x = gamepad.buttons[0].pressed;
    controller.buttons.circle = gamepad.buttons[1].pressed;
    controller.buttons.square = gamepad.buttons[3].pressed;
    controller.buttons.triangle = gamepad.buttons[2].pressed;
    controller.buttons.right_trigger = gamepad.buttons[7].pressed;
    controller.joysticks.right.x = gamepad.axes[3];
    controller.joysticks.right.y = gamepad.axes[4];
    updateView(); // Lets update our html page to show which buttons have been pressed;
    updateServer(); // Also, send new data to the server.
  }
}

function updateView() {
  document.getElementById('x').disabled = controller.buttons.x;
  document.getElementById('circle').disabled = controller.buttons.circle;
  document.getElementById('square').disabled = controller.buttons.square;
  document.getElementById('triangle').disabled = controller.buttons.triangle;
  document.getElementById('right_trigger').disabled = controller.buttons.right_trigger;
  document.getElementById('right_joystick').children[0].style.top = (43+(controller.joysticks.right.y*43))+'px';
  document.getElementById('right_joystick').children[0].style.left = (43+(controller.joysticks.right.x*43))+'px';
}

function updateServer() {
  socket.emit('controller-update', controller);
};

// Now lets start our loop functions

let interval = setInterval(gamepadReadLoop, 100);

