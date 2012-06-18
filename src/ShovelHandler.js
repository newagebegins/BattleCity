function ShovelHandler(eventManager) {
  this._eventManager = eventManager;
  this._eventManager.addSubscriber(this, [PowerUpHandler.Event.SHOVEL_START]);
  
  this._baseWallBuilder = null;
  this._pauseListener = new PauseListener(this._eventManager);
  
  this._duration = 300;
  this._timer = 0;
  this._active = false;
}

ShovelHandler.prototype.setBaseWallBuilder = function (builder) {
  this._baseWallBuilder = builder;
};

ShovelHandler.prototype.setDuration = function (duration) {
  this._duration = duration;
};

ShovelHandler.prototype.notify = function (event) {
  if (event.name == PowerUpHandler.Event.SHOVEL_START) {
    this.start();
  }
};

ShovelHandler.prototype.start = function () {
  this._active = true;
  this._timer = 0;
  this.rebuildWall(new SteelWallFactory(this._eventManager));
};

ShovelHandler.prototype.end = function () {
  this.rebuildWall(new BrickWallFactory(this._eventManager));
};

ShovelHandler.prototype.rebuildWall = function (wallFactory) {
  this._baseWallBuilder.destroyWall();
  this._baseWallBuilder.setWallFactory(wallFactory);
  this._baseWallBuilder.buildWall();
};

ShovelHandler.prototype.update = function () {
  if (this._pauseListener.isPaused()) {
    return;
  }
  this.updateTimer();
};

ShovelHandler.prototype.updateTimer = function () {
  if (!this._active) {
    return;
  }
  this._timer++;
  if (this._timer > this._duration) {
    this._active = false;
    this.end();
  }
};
