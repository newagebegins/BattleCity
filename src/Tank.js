function Tank(eventManager) {
  Sprite.call(this, eventManager);
  
  this._normalSpeed = 0;
  this._bulletSize = 1;
  this._bulletSpeed = 1;
}

Tank.subclass(Sprite);

Tank.Event = {};
Tank.Event.SHOOT = 'Tank.Event.SHOOT';

Tank.prototype.getNormalSpeed = function () {
  return this._normalSpeed;
};

Tank.prototype.setNormalSpeed = function (speed) {
  this._normalSpeed = speed;
};

Tank.prototype.toNormalSpeed = function () {
  this._speed = this._normalSpeed;
};

Tank.prototype.setBulletSize = function (size) {
  this._bulletSize = size;
};
  
Tank.prototype.getBulletSize = function () {
  return this._bulletSize;
};
  
Tank.prototype.setBulletSpeed = function (speed) {
  this._bulletSpeed = speed;
};

Tank.prototype.getBulletSpeed = function () {
  return this._bulletSpeed;
};
  
Tank.prototype.shoot = function () {
  this._eventManager.fireEvent({'name': Tank.Event.SHOOT, 'tank': this});
};
