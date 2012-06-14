function BulletExplosion(eventManager) {
  Sprite.call(this, eventManager);
  this._animation = new Animation([1,2,3]);
}

BulletExplosion.subclass(Sprite);

BulletExplosion.prototype.setFrames = function (frames) {
  this._animation.setFrames(frames);
};

BulletExplosion.prototype.getImage = function () {
  return 'bullet_explosion_' + this._animation.getFrame();
};

BulletExplosion.prototype.updateHook = function () {
  if (this._animation.isCompleted()) {
    this.destroy();
    return;
  }
  this._animation.update();
};

BulletExplosion.prototype.draw = function (ctx) {
  ctx.drawImage(ImageManager.getImage(this.getImage()), this._x, this._y);
};
