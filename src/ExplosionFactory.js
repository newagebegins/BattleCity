function ExplosionFactory(eventManager) {
  this._eventManager = eventManager;
  this._eventManager.addSubscriber(this, [Bullet.Event.DESTROYED]);
  
  this._explosionSize = 32;
}

ExplosionFactory.prototype.setExplosionSize = function (size) {
  this._explosionSize = size;
};

ExplosionFactory.prototype.getExplosionSize = function () {
  return this._explosionSize;
};

ExplosionFactory.prototype.notify = function (event) {
  if (event.name == Bullet.Event.DESTROYED) {
    this.createExplosion(event.bullet);
  }
};

ExplosionFactory.prototype.createExplosion = function (bullet) {
  var explosion = new Explosion(this._eventManager);
  explosion.setRect(new Rect(
    bullet.getX() - this._explosionSize / 2,
    bullet.getY() - this._explosionSize / 2,
    this._explosionSize,
    this._explosionSize));
  return explosion;
};
