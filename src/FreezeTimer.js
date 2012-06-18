function FreezeTimer(eventManager) {
  this._eventManager = eventManager;
  this._eventManager.addSubscriber(this, [PowerUpHandler.Event.FREEZE]);
  this._duration = 300;
  this._timer = 0;
  this._active = false;
  this._pauseListener = new PauseListener(this._eventManager);
}

FreezeTimer.Event = {};
FreezeTimer.Event.UNFREEZE = 'FreezeTimer.Event.UNFREEZE';

FreezeTimer.prototype.notify = function (event) {
  if (event.name == PowerUpHandler.Event.FREEZE) {
    this.start();
  }
};

FreezeTimer.prototype.start = function () {
  this._active = true;
  this._timer = 0;
};

FreezeTimer.prototype.unfreeze = function () {
  this._eventManager.fireEvent({'name': FreezeTimer.Event.UNFREEZE});
};

FreezeTimer.prototype.setDuration = function (duration) {
  this._duration = duration;
};

FreezeTimer.prototype.update = function () {
  if (this._pauseListener.isPaused()) {
    return;
  }
  if (!this._active) {
    return;
  }
  this._timer++;
  if (this._timer > this._duration) {
    this._active = false;
    this.unfreeze();
  }
};
