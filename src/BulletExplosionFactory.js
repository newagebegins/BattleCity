function BulletExplosionFactory(eventManager) {
  this._eventManager = eventManager;
  this._eventManager.addSubscriber(this, [Bullet.Event.DESTROYED]);
  
  this._explosionSize = Globals.UNIT_SIZE;
}

BulletExplosionFactory.prototype.setBulletExplosionSize = function (size) {
  this._explosionSize = size;
};

BulletExplosionFactory.prototype.getBulletExplosionSize = function () {
  return this._explosionSize;
};

BulletExplosionFactory.prototype.notify = function (event) {
  if (event.name == Bullet.Event.DESTROYED) {
    this.createBulletExplosion(event.bullet);
  }
};

BulletExplosionFactory.prototype.createBulletExplosion = function (bullet) {
  var explosion = new BulletExplosion(this._eventManager);
  var bulletCenter = bullet.getCenter();
  explosion.setRect(new Rect(
    bulletCenter.getX() - this._explosionSize / 2,
    bulletCenter.getY() - this._explosionSize / 2,
    this._explosionSize,
    this._explosionSize));
  return explosion;
};
