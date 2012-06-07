function Explosion(eventManager) {
  Sprite.call(this, eventManager);
  this._framesCount = 3;
  this._frame = 1;
}

Explosion.subclass(Sprite);

Explosion.prototype.setFramesCount = function (count) {
  this._framesCount = count;
};

Explosion.prototype.getFramesCount = function () {
  return this._framesCount;
};

Explosion.prototype.setFrame = function (frame) {
  this._frame = frame;
};

Explosion.prototype.getImage = function () {
  return 'explosion_' + this._frame;
};

Explosion.prototype.update = function () {
  this._frame++;
  if (this._frame > this._framesCount) {
    this.destroy();
  }
};

Explosion.prototype.draw = function (ctx) {
  ctx.drawImage(ImageManager.getImage(this.getImage()), this._x, this._y);
};
