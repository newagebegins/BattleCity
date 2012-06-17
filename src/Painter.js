function Painter(spriteContainer) {
  this._spriteContainer = spriteContainer;
}

Painter.prototype.draw = function (ctx) {
  var sprites = this._spriteContainer.getSprites();
  sprites.forEach(function (sprite) {
    sprite.draw(ctx);
  });
};
