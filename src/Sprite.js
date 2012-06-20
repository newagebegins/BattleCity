function Sprite(eventManager) {
  Rect.call(this);
  
  this._eventManager = eventManager;
  this._prevDirection = Sprite.Direction.RIGHT;
  this._direction = Sprite.Direction.RIGHT;
  this._normalSpeed = 0;
  this._speed = 0;
  this._destroyed = false;
  this._turn = false;
  this._zIndex = 0;
  this._pauseListener = new PauseListener(this._eventManager);
  this._moveFrequency = 1;
  this._moveTimer = 0;
  
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
  if (direction == this._direction) {
    return;
  }
  this._prevDirection = this._direction;
  this._direction = direction;
  this._turn = true;
};

Sprite.prototype.getPrevDirection = function () {
  return this._prevDirection;
};

Sprite.prototype.isTurn = function () {
  return this._turn;
};

Sprite.prototype.getSpeed = function () {
  return this._speed;
};
  
Sprite.prototype.setSpeed = function (speed) {
  this._speed = speed;
};

Sprite.prototype.getNormalSpeed = function () {
  return this._normalSpeed;
};

Sprite.prototype.setNormalSpeed = function (speed) {
  this._normalSpeed = speed;
};

Sprite.prototype.toNormalSpeed = function () {
  this._speed = this._normalSpeed;
};

Sprite.prototype.setMoveFrequency = function (moveFrequencty) {
  this._moveFrequency = moveFrequencty;
};

Sprite.prototype.stop = function () {
  this._speed = 0;
};
  
Sprite.prototype.move = function () {
  this._moveTimer++;
  if (this._moveTimer < this._moveFrequency || this._speed == 0) {
    return;
  }
  this._moveTimer = 0;
  this.doMove();
};

Sprite.prototype.doMove = function () {
  this._x = this._getNewX();
  this._y = this._getNewY();
  this._turn = false;
  this._eventManager.fireEvent({'name': Sprite.Event.MOVED, 'sprite': this});
  this.moveHook();
};

Sprite.prototype.moveHook = function () {
  // Should be overriden by subclasses to add behavior to the move() method.
};

/**
 * Should not be overriden by subclasses. Instead override updateHook().
 */
Sprite.prototype.update = function () {
  if (this._destroyed) {
    this.doDestroy();
    return;
  }
  
  if (!this.isPaused()) {
    this.move();
  }
  
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

/**
 * Should not be overriden by subclasses. Instead override destroyHook().
 */
Sprite.prototype.doDestroy = function () {
  this._pauseListener.destroy();
  this._eventManager.removeSubscriber(this);
  this._eventManager.fireEvent({'name': Sprite.Event.DESTROYED, 'sprite': this});
  this.destroyHook();
};

/**
 * Should be overriden by subclasses. All destroy operations specific to a
 * subclass should be placed here.
 */
Sprite.prototype.destroyHook = function () {
  
};

Sprite.prototype.resolveOutOfBounds = function (bounds) {
  if (this._direction == Sprite.Direction.RIGHT) {
    this._x = bounds.getRight() - this._w + 1;
  }
  else if (this._direction == Sprite.Direction.LEFT) {
    this._x = bounds.getLeft();
  }
  else if (this._direction == Sprite.Direction.UP) {
    this._y = bounds.getTop();
  }
  else if (this._direction == Sprite.Direction.DOWN) {
    this._y = bounds.getBottom() - this._h + 1;
  }
};

Sprite.prototype.setZIndex = function (zIndex) {
  this._zIndex = zIndex;
};

Sprite.prototype.getZIndex = function () {
  return this._zIndex;
};

Sprite.prototype.isPaused = function () {
  return this._pauseListener.isPaused();
};

Sprite.prototype.setPauseListener = function (listener) {
  this._pauseListener.destroy();
  this._pauseListener = listener;
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
