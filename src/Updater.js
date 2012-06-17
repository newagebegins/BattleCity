function Updater(spriteContainer) {
  this._spriteContainer = spriteContainer;
}

Updater.prototype.update = function () {
  var sprites = this._spriteContainer.getSprites();
  sprites.forEach(function (sprite) {
    sprite.update();
  });
};
