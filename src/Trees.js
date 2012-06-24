function Trees(eventManager) {
  Sprite.call(this, eventManager);
  this._zIndex = 1;
}

Trees.subclass(Sprite);

Trees.prototype.getClassName = function () {
  return 'Trees';
};

Trees.prototype.draw = function (ctx) {
  ctx.drawImage(ImageManager.getImage('trees'), this._x, this._y);
};
