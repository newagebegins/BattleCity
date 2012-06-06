function Sprite() {
  Rect.call(this);
  
  this._direction = Sprite.Direction.RIGHT;
  this._speed = 0;
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
