function Cursor(eventManager) {
  Sprite.call(this, eventManager);
  
  eventManager.addSubscriber(this, [CollisionDetector.Event.OUT_OF_BOUNDS]);
  
  this._w = 32;
  this._h = 32;
  this._normalSpeed = 32;
  this._blinkTimer = new BlinkTimer(12);
  
  this._moveDelay = 20;
  this._moveTimer = 0;
  this._moved = false;
}

Cursor.subclass(Sprite);

Cursor.prototype.toNormalSpeed = function () {
  Sprite.prototype.toNormalSpeed.call(this);
  this._moved = false;
};

Cursor.prototype.setMoveDelay = function (delay) {
  this._moveDelay = delay;
};

Cursor.prototype.notify = function (event) {
  if (event.name == CollisionDetector.Event.OUT_OF_BOUNDS && event.sprite === this) {
    this.resolveOutOfBounds(event.bounds);
  }
};

Cursor.prototype.move = function () {
  if (this._moved) {
    this._moveTimer++;
    if (this._moveTimer <= this._moveDelay) {
      return;
    }
  }
  Sprite.prototype.move.call(this);
  this._moveTimer = 0;
  this._moved = true;
};

Cursor.prototype.updateHook = function () {
  this._blinkTimer.update();
};

Cursor.prototype.draw = function (ctx) {
  if (this._blinkTimer.isVisible()) {
    ctx.drawImage(ImageManager.getImage('tank_up_1'), this._x, this._y);
  }
};

Cursor.prototype.resolveOutOfBounds = function (bounds) {
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
