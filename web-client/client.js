// First lets define our controllers states.  For this example, I'll encode
// the four main buttons, the right trigger, and the right joy sticks.
let controller = {
  buttons: {
    x: false,
    circle: false,
    square: false,
    tiangle: false,
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

// First, lets detect if a gamepad has been connected
window.addEventListener('gamepadconnected', function (ev) {
  console.log(ev.gamepad);
});

