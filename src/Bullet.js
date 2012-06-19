function Bullet(eventManager, tank) {
  Sprite.call(this, eventManager);
  eventManager.addSubscriber(this, [
    CollisionDetector.Event.OUT_OF_BOUNDS,
    CollisionDetector.Event.COLLISION
  ]);
  this._tank = tank;
  this._explode = true;
  this._type = Bullet.Type.NORMAL;
}

Bullet.subclass(Sprite);

Bullet.Event = {};
Bullet.Event.DESTROYED = 'Bullet.Event.DESTROYED';

Bullet.Speed = {};
Bullet.Speed.NORMAL = 5;
Bullet.Speed.FAST = 8;

Bullet.Type = {};
Bullet.Type.NORMAL = 'Bullet.Type.NORMAL';
Bullet.Type.ENHANCED = 'Bullet.Type.ENHANCED';

Bullet.prototype.notify = function (event) {
  if (this._outOfBounds(event) || this._wallCollision(event)) {
    this.destroy();
  }
  else if (this._tankCollision(event) && event.sprite.isCollidable()) {
    this._explode = event.sprite.canBeDestroyed();
    this.destroy();
  }
  else if (this._bulletCollision(event)) {
    this._explode = false;
    this.destroy();
  }
};

Bullet.prototype.destroyHook = function () {
  this._eventManager.fireEvent({'name': Bullet.Event.DESTROYED, 'bullet': this, 'tank': this._tank});
};

Bullet.prototype.getImage = function () {
  return 'bullet_' + this._direction;
};

Bullet.prototype.draw = function (ctx) {
  ctx.drawImage(ImageManager.getImage(this.getImage()), this._x, this._y);
};

Bullet.prototype.getTank = function () {
  return this._tank;
};

Bullet.prototype.setExplode = function (value) {
  this._explode = value;
};

Bullet.prototype.shouldExplode = function () {
  return this._explode;
};

Bullet.prototype.getType = function () {
  return this._type;
};

Bullet.prototype.setType = function (type) {
  this._type = type;
};

Bullet.prototype._outOfBounds = function (event) {
  return event.name == CollisionDetector.Event.OUT_OF_BOUNDS && event.sprite === this;
};

Bullet.prototype._wallCollision = function (event) {
  if (event.name != CollisionDetector.Event.COLLISION) {
    return false;
  }
  if (event.initiator !== this) {
    return false;
  }
  if (!(event.sprite instanceof Wall)) {
    return false
  }
  return true
};

Bullet.prototype._tankCollision = function (event) {
  if (event.name != CollisionDetector.Event.COLLISION) {
    return false;
  }
  if (event.initiator !== this) {
    return false;
  }
  if (!(event.sprite instanceof Tank)) {
    return false;
  }
  var otherTank = event.sprite;
  if (otherTank === this._tank) {
    return false;
  }
  if (otherTank.isEnemy() && this._tank.isEnemy()) {
    return false;
  }
  return true;
};

Bullet.prototype._bulletCollision = function (event) {
  if (event.name != CollisionDetector.Event.COLLISION) {
    return false;
  }
  if (!(event.sprite instanceof Bullet && event.initiator instanceof Bullet)) {
    return false;
  }
  var otherTank = event.sprite.getTank();
  if (this._tank.isEnemy() && otherTank.isEnemy()) {
    return false;
  }
  return true;
};
