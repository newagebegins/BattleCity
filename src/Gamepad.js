// Gamepad support. Polls the browser Gamepad API each frame and translates
// button/axis state into the same events that Keyboard fires, reusing the
// Keyboard.Key codes so every existing event subscriber works unchanged.
function Gamepad(eventManager) {
  this._eventManager = eventManager;
  this._events = [];
  this._pressed = {};
}

// Axis deflection past which the analog stick counts as a direction press.
Gamepad.AXIS_THRESHOLD = 0.5;

// Maps a logical button to one or more standard-gamepad sources. Each entry is
// checked every frame; if any of its sources is active the button is "down".
// See https://w3c.github.io/gamepad/#remapping for the standard mapping.
Gamepad.Buttons = [
  // D-pad and left analog stick -> arrow keys.
  {key: Keyboard.Key.UP, buttons: [12], axis: 1, axisDir: -1},
  {key: Keyboard.Key.DOWN, buttons: [13], axis: 1, axisDir: 1},
  {key: Keyboard.Key.LEFT, buttons: [14], axis: 0, axisDir: -1},
  {key: Keyboard.Key.RIGHT, buttons: [15], axis: 0, axisDir: 1},
  // A / B (and X / Y) -> fire.
  {key: Keyboard.Key.SPACE, buttons: [0, 1, 2, 3]},
  // Start / Select.
  {key: Keyboard.Key.START, buttons: [9]},
  {key: Keyboard.Key.SELECT, buttons: [8]}
];

Gamepad.prototype._getGamepad = function () {
  if (!navigator.getGamepads) {
    return null;
  }
  var gamepads = navigator.getGamepads();
  for (var i = 0; i < gamepads.length; i++) {
    if (gamepads[i] && gamepads[i].connected) {
      return gamepads[i];
    }
  }
  return null;
};

Gamepad.prototype._isDown = function (mapping, gamepad) {
  var buttons = mapping.buttons || [];
  for (var i = 0; i < buttons.length; i++) {
    var button = gamepad.buttons[buttons[i]];
    if (button && (button.pressed || button.value > 0.5)) {
      return true;
    }
  }
  if (mapping.axis !== undefined && gamepad.axes.length > mapping.axis) {
    var value = gamepad.axes[mapping.axis];
    if (mapping.axisDir > 0 && value >= Gamepad.AXIS_THRESHOLD) {
      return true;
    }
    if (mapping.axisDir < 0 && value <= -Gamepad.AXIS_THRESHOLD) {
      return true;
    }
  }
  return false;
};

Gamepad.prototype._poll = function () {
  var gamepad = this._getGamepad();
  if (!gamepad) {
    return;
  }
  Gamepad.Buttons.forEach(function (mapping) {
    var down = this._isDown(mapping, gamepad);
    if (down && !this._pressed[mapping.key]) {
      this._pressed[mapping.key] = true;
      this._events.push({name: Keyboard.Event.KEY_PRESSED, key: mapping.key});
    }
    else if (!down && this._pressed[mapping.key]) {
      this._pressed[mapping.key] = false;
      this._events.push({name: Keyboard.Event.KEY_RELEASED, key: mapping.key});
    }
  }, this);
};

Gamepad.prototype.fireEvents = function () {
  this._poll();
  this._events.forEach(function (event) {
    this._eventManager.fireEvent(event);
  }, this);
  this._events = [];
};
