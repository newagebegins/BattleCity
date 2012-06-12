function Base(eventManager) {
  Sprite.call(this, eventManager);
  
  this._w = 32;
  this._h = 32;
}

Base.subclass(Sprite);

Base.prototype.draw = function (ctx) {
  ctx.drawImage(ImageManager.getImage('base'), this._x, this._y);
};
