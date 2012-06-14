function Explosion(eventManager) {
  Sprite.call(this, eventManager);
  this._animation = new Animation([1,2,3]);
}

Explosion.subclass(Sprite);

Explosion.prototype.setFrames = function (frames) {
  this._animation.setFrames(frames);
};

Explosion.prototype.getImage = function () {
  return 'explosion_' + this._animation.getFrame();
};

Explosion.prototype.updateHook = function () {
  if (this._animation.isCompleted()) {
    this.destroy();
    return;
  }
  this._animation.update();
};

Explosion.prototype.draw = function (ctx) {
  ctx.drawImage(ImageManager.getImage(this.getImage()), this._x, this._y);
};
