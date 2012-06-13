function TankStateNormal(tank) {
  this._tank = tank;
  this._trackFrame = 1;
}

TankStateNormal.prototype.getImage = function () {
  return 'tank_' + this._tank.getDirection() + '_' + this._trackFrame;
};

TankStateNormal.prototype.update = function () {
  this.updateTrackFrame();
};

TankStateNormal.prototype.updateTrackFrame = function () {
  if (this._tank.getSpeed() == 0) {
    return;
  }
  this._trackFrame = this._trackFrame == 1 ? 2 : 1;
};

TankStateNormal.prototype.draw = function (ctx) {
  ctx.drawImage(ImageManager.getImage(this.getImage()), this._tank.getX(), this._tank.getY());
};

TankStateNormal.prototype.canMove = function () {
  return true;
};

TankStateNormal.prototype.canShoot = function () {
  return true;
};

TankStateNormal.prototype.getTrackFrame = function () {
  return this._trackFrame;
};

TankStateNormal.prototype.setTrackFrame = function (frame) {
  this._trackFrame = frame;
};
