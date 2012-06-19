function TankExplosion(eventManager, tank) {
  Explosion.call(this, eventManager);
  this._tank = tank;
  this._animation = new Animation([1,2,3,4,5,3], 3);
}

TankExplosion.subclass(Explosion);

TankExplosion.Event = {};
TankExplosion.Event.DESTROYED = 'TankExplosion.Event.DESTROYED';

TankExplosion.prototype.getImage = function () {
  return 'big_explosion_' + this._animation.getFrame();
};

TankExplosion.prototype.destroyHook = function () {
  this._eventManager.fireEvent({'name': TankExplosion.Event.DESTROYED, 'explosion': this});
};

TankExplosion.prototype.getTank = function () {
  return this._tank;
};
