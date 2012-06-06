function Bullet(eventManager) {
  Sprite.call(this, eventManager);
}

Bullet.subclass(Sprite);

Bullet.Event = {};
Bullet.Event.DESTROYED = 'Bullet.Event.DESTROYED';

Bullet.prototype.notify = function (event) {
  if (event.name == CollisionDetector.Event.OUT_OF_BOUNDS && event.sprite === this) {
    this._eventManager.fireEvent({'name': Bullet.Event.DESTROYED});
  }
};
