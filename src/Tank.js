function Tank(eventManager) {
  Sprite.call(this);
  
  this._eventManager = eventManager;
  this._speed = 0;
  this._normalSpeed = 0;
  this._direction = Tank.Direction.RIGHT;
}

Tank.subclass(Sprite);

Tank.Direction = {
  RIGHT: 'RIGHT',
  LEFT: 'LEFT',
  UP: 'UP',
  DOWN: 'DOWN',
};

Tank.Event = {};
Tank.Event.SHOOT = 'Tank.Event.SHOOT';

Tank.prototype.getSpeed = function () {
  return this._speed;
};
  
Tank.prototype.setSpeed = function (speed) {
  this._speed = speed;
};

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
  
Tank.prototype.getDirection = function () {
  return this._direction;
};
  
Tank.prototype.setDirection = function (direction) {
  this._direction = direction;
};
  
Tank.prototype.move = function () {
  this._x = this._getNewX();
  this._y = this._getNewY();
  this._eventManager.fireEvent({'name': Sprite.Event.MOVED, 'sprite': this});
};
  
Tank.prototype.shoot = function () {
  this._eventManager.fireEvent({'name': Tank.Event.SHOOT, 'tank': this});
};
  
Tank.prototype._getNewX = function () {
  var result = this._x;
      
  if (this._direction == Tank.Direction.RIGHT) {
    result += this._speed;
  }
  else if (this._direction == Tank.Direction.LEFT) {
    result -= this._speed;
  }
    
  return result;
};
  
Tank.prototype._getNewY = function () {
  var result = this._y;
      
  if (this._direction == Tank.Direction.UP) {
    result -= this._speed;
  }
  else if (this._direction == Tank.Direction.DOWN) {
    result += this._speed;
  }
    
  return result;
};
