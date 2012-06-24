function TankExplosionFactory(eventManager) {
  this._eventManager = eventManager;
  this._eventManager.addSubscriber(this, [Tank.Event.DESTROYED]);
  this._explosionSize = Globals.UNIT_SIZE * 2;
}

TankExplosionFactory.prototype.setExplosionSize = function (size) {
  this._explosionSize = size;
};

TankExplosionFactory.prototype.getExplosionSize = function () {
  return this._explosionSize;
};

TankExplosionFactory.prototype.notify = function (event) {
  if (event.name == Tank.Event.DESTROYED) {
    this.create(event.tank);
  }
};

TankExplosionFactory.prototype.create = function (tank) {
  var explosion = new TankExplosion(this._eventManager, tank);
  var tankCenter = tank.getCenter();
  explosion.setRect(new Rect(
    tankCenter.getX() - this._explosionSize / 2,
    tankCenter.getY() - this._explosionSize / 2,
    this._explosionSize,
    this._explosionSize));
  
  SoundManager.play("explosion_1");
 
  return explosion;
};
