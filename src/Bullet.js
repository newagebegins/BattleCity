function Bullet(eventManager, tank) {
  Sprite.call(this, eventManager);
  eventManager.addSubscriber(this, [CollisionDetector.Event.OUT_OF_BOUNDS]);
  this._tank = tank;
}

Bullet.subclass(Sprite);

Bullet.Event = {};
Bullet.Event.DESTROYED = 'Bullet.Event.DESTROYED';

Bullet.prototype.notify = function (event) {
  if (event.name == CollisionDetector.Event.OUT_OF_BOUNDS && event.sprite === this) {
    this.destroy();
  }
};

Bullet.prototype.destroy = function () {
  Sprite.prototype.destroy.call(this);
  this._eventManager.fireEvent({'name': Bullet.Event.DESTROYED, 'tank': this._tank});
};
