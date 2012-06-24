function Pause(eventManager) {
  this._eventManager = eventManager;
  this._eventManager.addSubscriber(this, [Keyboard.Event.KEY_PRESSED]);
  this._pause = false;
  this._blinkTimer = new BlinkTimer(12);
  this._active = true;
}

Pause.Event = {};
Pause.Event.START = 'Pause.Event.START';
Pause.Event.END = 'Pause.Event.END';

Pause.prototype.notify = function (event) {
  if (event.name == Keyboard.Event.KEY_PRESSED) {
    this.keyPressed(event.key);
  }
};

Pause.prototype.keyPressed = function (key) {
  if (!this._active) {
    return;
  }
  if (key == Keyboard.Key.START) {
    this._pause = !this._pause;
    
    if (this._pause) {
      SoundManager.play("pause");
      this._eventManager.fireEvent({'name': Pause.Event.START});
    }
    else {
      this._eventManager.fireEvent({'name': Pause.Event.END});
    }
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
  ctx.fillText("PAUSE", 202, 240);
};

Pause.prototype.setActive = function (active) {
  this._active = active;
};
