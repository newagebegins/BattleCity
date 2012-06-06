function Sprite(eventManager) {
  Rect.call(this);
  
  this._eventManager = eventManager;
  this._direction = Sprite.Direction.RIGHT;
  this._speed = 0;
  
  this._eventManager.fireEvent({'name': Sprite.Event.CREATED, 'sprite': this});
}

Sprite.subclass(Rect);

Sprite.Direction = {
  RIGHT: 'RIGHT',
  LEFT: 'LEFT',
  UP: 'UP',
  DOWN: 'DOWN',
};

Sprite.Event = {};
Sprite.Event.MOVED = 'Sprite.Event.MOVED';
Sprite.Event.CREATED = 'Sprite.Event.CREATED';
Sprite.Event.DESTROYED = 'Sprite.Event.DESTROYED';

Sprite.prototype.getDirection = function () {
  return this._direction;
};
  
Sprite.prototype.setDirection = function (direction) {
  this._direction = direction;
};

Sprite.prototype.getSpeed = function () {
  return this._speed;
};
  
Sprite.prototype.setSpeed = function (speed) {
  this._speed = speed;
};

Sprite.prototype.stop = function () {
  this._speed = 0;
};
  
Sprite.prototype.move = function () {
  if (this._speed == 0) {
    return;
  }
  this._x = this._getNewX();
  this._y = this._getNewY();
  this._eventManager.fireEvent({'name': Sprite.Event.MOVED, 'sprite': this});
};
  
Sprite.prototype.draw = function (ctx) {
  ctx.fillStyle = "red";
  ctx.fillRect(this._x, this._y, this._w, this._h);
};
  
Sprite.prototype.update = function () {
  this.move();
};
  
Sprite.prototype.destroy = function () {
  this._eventManager.removeSubscriber(this);
  this._eventManager.fireEvent({'name': Sprite.Event.DESTROYED, 'sprite': this});
};

Sprite.prototype._getNewX = function () {
  var result = this._x;
      
  if (this._direction == Sprite.Direction.RIGHT) {
    result += this._speed;
  }
  else if (this._direction == Sprite.Direction.LEFT) {
    result -= this._speed;
  }
    
  return result;
};
  
Sprite.prototype._getNewY = function () {
  var result = this._y;
      
  if (this._direction == Sprite.Direction.UP) {
    result -= this._speed;
  }
  else if (this._direction == Sprite.Direction.DOWN) {
    result += this._speed;
  }
    
  return result;
};
