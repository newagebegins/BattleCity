function Water(eventManager) {
  Sprite.call(this, eventManager);
  this._animation = new Animation([1,2], 30, true);
  this._w = Globals.UNIT_SIZE;
  this._h = Globals.UNIT_SIZE;
}

Water.subclass(Sprite);

Water.prototype.getClassName = function () {
  return 'Water';
};

Water.prototype.stopAnimation = function () {
  this._animation.setActive(false);
};

Water.prototype.updateHook = function () {
  this._animation.update();
};

Water.prototype.getImage = function () {
  return 'water_' + this._animation.getFrame();
};

Water.prototype.draw = function (ctx) {
  ctx.drawImage(ImageManager.getImage(this.getImage()), this._x, this._y);
};
