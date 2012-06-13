function TankStateAppearing(tank) {
  this._tank = tank;
  this._eventManager = this._tank.getEventManager();
  this._frames = [1,1,1,2,2,2,3,3,3,4,4,4,3,3,3,2,2,2,1,1,1,2,2,2,3,3,3,4,4,4,3,3,3,2,2,2,1,1,1];
  this._frame = 0;
}

TankStateAppearing.Event = {};
TankStateAppearing.Event.END = 'TankStateAppearing.Event.END';

TankStateAppearing.prototype.getImage = function () {
  return 'appear_' + this.getFrame();
};

TankStateAppearing.prototype.update = function () {
  this.updateFrame();
};

TankStateAppearing.prototype.updateFrame = function () {
  if (this._animationCompleted()) {
    this._eventManager.fireEvent({'name': TankStateAppearing.Event.END, 'tank': this._tank});
    return;
  }
  this._frame++;
};

TankStateAppearing.prototype.canMove = function () {
  return false;
};

TankStateAppearing.prototype.canShoot = function () {
  return false;
};

TankStateAppearing.prototype.getFrame = function () {
  return this._frames[this._frame];
};

TankStateAppearing.prototype.setFrames = function (frames) {
  this._frames = frames;
};

TankStateAppearing.prototype._animationCompleted = function () {
  return this._frame >= (this._frames.length - 1);
};
