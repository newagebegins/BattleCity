function Keyboard(eventManager) {
  this._eventManager = eventManager;
  this._events = [];
  this._listen();
}

Keyboard.Key = {};
Keyboard.Key.SPACE = 32;
Keyboard.Key.LEFT = 37;
Keyboard.Key.UP = 38;
Keyboard.Key.RIGHT = 39;
Keyboard.Key.DOWN = 40;
Keyboard.Key.S = 83;

Keyboard.Event = {};
Keyboard.Event.KEY_PRESSED = 'Keyboard.Event.KEY_PRESSED';
Keyboard.Event.KEY_RELEASED = 'Keyboard.Event.KEY_RELEASED';

Keyboard.prototype._listen = function () {
  var self = this;
  $(document).keydown(function (event) {
    self._events.push({name: Keyboard.Event.KEY_PRESSED, key: event.which});
    event.preventDefault();
  });
  $(document).keyup(function (event) {
    self._events.push({name: Keyboard.Event.KEY_RELEASED, key: event.which});
    event.preventDefault();
  });
};

Keyboard.prototype.fireEvents = function () {
  this._events.forEach(function (event) {
    this._eventManager.fireEvent(event);
  }, this);
  this._events = [];
};
