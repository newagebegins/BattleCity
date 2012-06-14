function TankStateAppearing(tank) {
  this._tank = tank;
  this._eventManager = this._tank.getEventManager();
  this._animation = new Animation([1,1,1,2,2,2,3,3,3,4,4,4,3,3,3,2,2,2,1,1,1,2,2,2,3,3,3,4,4,4,3,3,3,2,2,2,1,1,1]);
}

TankStateAppearing.Event = {};
TankStateAppearing.Event.END = 'TankStateAppearing.Event.END';

TankStateAppearing.prototype.getImage = function () {
  return 'appear_' + this._animation.getFrame();
};

TankStateAppearing.prototype.update = function () {
  this._animation.update();
  if (this._animation.isCompleted()) {
    this._eventManager.fireEvent({'name': TankStateAppearing.Event.END, 'tank': this._tank});
  }
};

TankStateAppearing.prototype.draw = function (ctx) {
  ctx.drawImage(ImageManager.getImage(this.getImage()), this._tank.getX(), this._tank.getY());
};

TankStateAppearing.prototype.canMove = function () {
  return false;
};

TankStateAppearing.prototype.canShoot = function () {
  return false;
};

TankStateAppearing.prototype.setFrames = function (frames) {
  this._animation.setFrames(frames);
};
