function PauseListener(eventManager) {
  this._eventManager = eventManager;
  this._eventManager.addSubscriber(this, [Pause.Event.START, Pause.Event.END]);
  this._pause = false;
}

PauseListener.prototype.notify = function (event) {
  if (event.name == Pause.Event.START) {
    this.pause();
  }
  else if (event.name == Pause.Event.END) {
    this.unpause();
  }
};

PauseListener.prototype.pause = function () {
  this._pause = true;
}

PauseListener.prototype.unpause = function () {
  this._pause = false;
}

PauseListener.prototype.isPaused = function () {
  return this._pause;
}

PauseListener.prototype.destroy = function () {
  this._eventManager.removeSubscriber(this);
}
