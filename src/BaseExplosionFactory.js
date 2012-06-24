function BaseExplosionFactory(eventManager) {
  this._eventManager = eventManager;
  this._eventManager.addSubscriber(this, [Base.Event.HIT]);
  this._explosionSize = Globals.UNIT_SIZE * 2;
}

BaseExplosionFactory.prototype.setExplosionSize = function (size) {
  this._explosionSize = size;
};

BaseExplosionFactory.prototype.getExplosionSize = function () {
  return this._explosionSize;
};

BaseExplosionFactory.prototype.notify = function (event) {
  if (event.name == Base.Event.HIT) {
    this.create(event.base);
  }
};

BaseExplosionFactory.prototype.create = function (base) {
  var explosion = new BaseExplosion(this._eventManager);
  var baseCenter = base.getCenter();
  explosion.setRect(new Rect(
    baseCenter.getX() - this._explosionSize / 2,
    baseCenter.getY() - this._explosionSize / 2,
    this._explosionSize,
    this._explosionSize));
    
  SoundManager.play("explosion_2");
  
  return explosion;
};
