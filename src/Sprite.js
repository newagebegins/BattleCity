function Sprite(eventManager) {
  Rect.call(this);
  
  this._eventManager = eventManager;
  this._direction = Sprite.Direction.RIGHT;
  this._speed = 0;
  this._destroyed = false;
  
  this._eventManager.fireEvent({'name': Sprite.Event.CREATED, 'sprite': this});
}

Sprite.subclass(Rect);

Sprite.Direction = {
  RIGHT: 'right',
  LEFT: 'left',
  UP: 'up',
  DOWN: 'down',
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

/**
 * Should not be overriden by subclasses. Instead override updateHook().
 */
Sprite.prototype.update = function () {
  if (this._destroyed) {
    this.doDestroy();
    return;
  }
  
  this.move();
  this.updateHook();
};

/**
 * Should be overriden by subclasses. All update operations specific to a
 * subclass should be placed here.
 */
Sprite.prototype.updateHook = function () {
  
};
  
Sprite.prototype.destroy = function () {
  this._destroyed = true;
};
  
Sprite.prototype.isDestroyed = function () {
  return this._destroyed;
};

Sprite.prototype.doDestroy = function () {
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
