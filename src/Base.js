function Base(eventManager) {
  Sprite.call(this, eventManager);
  
  this._w = Globals.UNIT_SIZE;
  this._h = Globals.UNIT_SIZE;
}

Base.subclass(Sprite);

Base.prototype.draw = function (ctx) {
  ctx.drawImage(ImageManager.getImage('base'), this._x, this._y);
};
