function Painter(eventManager) {
  SpriteContainer.call(this, eventManager);
}

Painter.subclass(SpriteContainer);

Painter.prototype.draw = function (ctx) {
  this._sprites.forEach(function (sprite) {
    sprite.draw(ctx);
  });
};

Painter.prototype.addSprite = function (sprite) {
  SpriteContainer.prototype.addSprite.call(this, sprite);
  this._sortSpritesByZIndex();
};

Painter.prototype._sortSpritesByZIndex = function () {
  this._sprites.sort(function (a, b) {
    if (a.getZIndex() < b.getZIndex()) {
      return -1;
    }
    if (a.getZIndex() > b.getZIndex()) {
      return 1;
    }
    return 0;
  });
};
