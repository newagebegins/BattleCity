function BaseExplosion(eventManager) {
  Explosion.call(this, eventManager);
  this._animation = new Animation([1,2,3,4,5,3], 3);
}

BaseExplosion.subclass(Explosion);

BaseExplosion.Event = {};
BaseExplosion.Event.DESTROYED = 'BaseExplosion.Event.DESTROYED';

BaseExplosion.prototype.getImage = function () {
  return 'big_explosion_' + this._animation.getFrame();
};

BaseExplosion.prototype.destroyHook = function () {
  this._eventManager.fireEvent({'name': BaseExplosion.Event.DESTROYED, 'explosion': this});
};
