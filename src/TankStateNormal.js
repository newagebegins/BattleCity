function TankStateNormal(tank) {
  this._tank = tank;
  this._trackAnimation = new Animation([1,2], 1, true);
}

TankStateNormal.prototype.getImage = function () {
  return 'tank_' + this._tank.getType() + '_' + this._tank.getDirection() + '_' + this._trackAnimation.getFrame();
};

TankStateNormal.prototype.update = function () {
  if (this._tank.getSpeed() == 0) {
    return;
  }
  this._trackAnimation.update()
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

TankStateNormal.prototype.canBeDestroyed = function () {
  return true;
};

TankStateNormal.prototype.isCollidable = function () {
  return true;
};

TankStateNormal.prototype.getTrackFrame = function () {
  return this._trackAnimation.getFrame();
};
