function TankStateNormal(tank) {
  this._tank = tank;
  this._trackAnimation = new Animation([1,2], this._tank.getTrackAnimationDuration(), true);
  
  this._flashDuration = 7;
  this._flashTimer = 0;
  this._flashed = true;
}

TankStateNormal.prototype.getImage = function () {
  var image = 'tank_' + this._tank.getType() + '_'  + this._tank.getDirection() + '_c' + this._tank.getColorValue() + '_t' + this._trackAnimation.getFrame();
  if (this._tank.isFlashing() && this._flashed && this._tank.isNotHit()) {
    image += '_f';
  }
  if (this._tank.getUpgradeLevel()) {
    image += '_s' + this._tank.getUpgradeLevel();
  }
  return image;
};

TankStateNormal.prototype.update = function () {
  if (!this._tank.isPaused()) {
    this.updateTrackAnimation();
  }
  this.updateFlash();
  this._tank.updateColor();
};

TankStateNormal.prototype.updateTrackAnimation = function () {
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

TankStateNormal.prototype.setFlashDuration = function (duration) {
  this._flashDuration = duration;
};

TankStateNormal.prototype.isFlashed = function () {
  return this._flashed;
};

TankStateNormal.prototype.setFlashed = function (value) {
  this._flashed = value;
};

TankStateNormal.prototype.updateFlash = function () {
  this._flashTimer++;
  if (this._flashTimer >= this._flashDuration) {
    this._flashTimer = 0;
    this._flashed = !this._flashed;
  }
};
