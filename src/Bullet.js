function Bullet(eventManager) {
  Sprite.call(this, eventManager);
}

Bullet.subclass(Sprite);

Bullet.Event = {};
Bullet.Event.DESTROYED = 'Bullet.Event.DESTROYED';
