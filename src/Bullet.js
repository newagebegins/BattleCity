function Bullet(eventManager, tank) {
  Sprite.call(this, eventManager);
  eventManager.addSubscriber(this, [
    CollisionDetector.Event.OUT_OF_BOUNDS,
    CollisionDetector.Event.COLLISION
  ]);
  this._tank = tank;
}

Bullet.subclass(Sprite);

Bullet.Event = {};
Bullet.Event.DESTROYED = 'Bullet.Event.DESTROYED';

Bullet.prototype.notify = function (event) {
  if (this._outOfBounds(event) || this._wallCollision(event) || this._tankCollision(event)) {
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
