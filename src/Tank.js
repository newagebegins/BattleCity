function Tank(eventManager) {
  Sprite.call(this);
  
  this._eventManager = eventManager;
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

Tank.prototype.stop = function () {
  this._speed = 0;
};
  
Tank.prototype.move = function () {
  this._x = this._getNewX();
  this._y = this._getNewY();
  this._eventManager.fireEvent({'name': Sprite.Event.MOVED, 'sprite': this});
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
  
Tank.prototype._getNewX = function () {
  var result = this._x;
      
  if (this._direction == Sprite.Direction.RIGHT) {
    result += this._speed;
  }
  else if (this._direction == Sprite.Direction.LEFT) {
    result -= this._speed;
  }
    
  return result;
};
  
Tank.prototype._getNewY = function () {
  var result = this._y;
      
  if (this._direction == Sprite.Direction.UP) {
    result -= this._speed;
  }
  else if (this._direction == Sprite.Direction.DOWN) {
    result += this._speed;
  }
    
  return result;
};
