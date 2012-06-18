function Pause(eventManager) {
  this._eventManager = eventManager;
  this._eventManager.addSubscriber(this, [Keyboard.Event.KEY_PRESSED, Keyboard.Event.KEY_RELEASED]);
  this._pIsPressed = false;
  this._pause = false;
  this._blinkTimer = new BlinkTimer(12);
}

Pause.Event = {};
Pause.Event.START = 'Pause.Event.START';
Pause.Event.END = 'Pause.Event.END';

Pause.prototype.notify = function (event) {
  if (event.name == Keyboard.Event.KEY_PRESSED) {
    this.keyPressed(event.key);
  }
  else if (event.name == Keyboard.Event.KEY_RELEASED) {
    this.keyReleased(event.key);
  }
};

Pause.prototype.keyPressed = function (key) {
  if (key == Keyboard.Key.P && !this._pIsPressed) {
    this._pIsPressed = true;
    this._pause = !this._pause;
    
    if (this._pause) {
      this._eventManager.fireEvent({'name': Pause.Event.START});
    }
    else {
      this._eventManager.fireEvent({'name': Pause.Event.END});
    }
  }
};

Pause.prototype.keyReleased = function (key) {
  if (key == Keyboard.Key.P) {
    this._pIsPressed = false;
  }
};

Pause.prototype.update = function () {
  if (!this._pause) {
    return;
  }
  this._blinkTimer.update();
};

Pause.prototype.draw = function (ctx) {
  if (!this._pause || !this._blinkTimer.isVisible()) {
    return;
  }
  ctx.fillStyle = "#e44437";
  ctx.font = "16px prstart"
  ctx.fillText("PAUSE", 202, 240);
};
