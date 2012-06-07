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
  if ((event.name == CollisionDetector.Event.OUT_OF_BOUNDS && event.sprite === this) ||
      (event.name == CollisionDetector.Event.COLLISION && event.initiator === this && event.sprite instanceof Wall)) {
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
