function Points(eventManager) {
  Sprite.call(this, eventManager);
  this._value = 0;
  this._duration = 20;
  this._timer = 0;
  this._type = Points.Type.TANK;
}

Points.subclass(Sprite);

Points.Type = {};
Points.Type.TANK = 'Points.Type.TANK';
Points.Type.POWERUP = 'Points.Type.POWERUP';

Points.Event = {};
Points.Event.DESTROYED = 'Points.Event.DESTROYED';

Points.prototype.setValue = function (value) {
  this._value = value;
};

Points.prototype.getValue = function () {
  return this._value;
};

Points.prototype.setDuration = function (duration) {
  this._duration = duration;
};

Points.prototype.setType = function (type) {
  this._type = type;
};

Points.prototype.getType = function () {
  return this._type;
};

Points.prototype.updateTimer = function () {
  this._timer++;
  if (this._timer > this._duration) {
    this.destroy();
  }
};

Points.prototype.updateHook = function () {
  if (this._pauseListener.isPaused()) {
    return;
  }
  this.updateTimer();
};

Points.prototype.getImage = function () {
  return 'points_' + this._value;
};

Points.prototype.draw = function (ctx) {
  ctx.drawImage(ImageManager.getImage(this.getImage()), this._x, this._y);
};

Points.prototype.destroyHook = function () {
  this._eventManager.fireEvent({'name': Points.Event.DESTROYED, 'points': this});
};
