function Painter() {
  SpriteContainer.call(this);
}

Painter.subclass(SpriteContainer);

Painter.prototype.draw = function (ctx) {
  this._sprites.forEach(function (sprite) {
    sprite.draw(ctx);
  });
};
