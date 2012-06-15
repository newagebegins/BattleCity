function TankExplosion(eventManager) {
  Explosion.call(this, eventManager);
  this._animation = new Animation([1,2,3,4,5,3], 3);
}

TankExplosion.subclass(Explosion);

TankExplosion.prototype.getImage = function () {
  return 'tank_explosion_' + this._animation.getFrame();
};
