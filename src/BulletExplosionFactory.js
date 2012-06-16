function BulletExplosionFactory(eventManager) {
  this._eventManager = eventManager;
  this._eventManager.addSubscriber(this, [Bullet.Event.DESTROYED]);
  
  this._explosionSize = Globals.UNIT_SIZE;
}

BulletExplosionFactory.prototype.setExplosionSize = function (size) {
  this._explosionSize = size;
};

BulletExplosionFactory.prototype.getExplosionSize = function () {
  return this._explosionSize;
};

BulletExplosionFactory.prototype.notify = function (event) {
  if (event.name == Bullet.Event.DESTROYED && event.bullet.shouldExplode()) {
    this.create(event.bullet);
  }
};

BulletExplosionFactory.prototype.create = function (bullet) {
  var explosion = new BulletExplosion(this._eventManager);
  var bulletCenter = bullet.getCenter();
  explosion.setRect(new Rect(
    bulletCenter.getX() - this._explosionSize / 2,
    bulletCenter.getY() - this._explosionSize / 2,
    this._explosionSize,
    this._explosionSize));
  return explosion;
};
