function Updater() {
  SpriteContainer.call(this);
}

Updater.subclass(SpriteContainer);

Updater.prototype.update = function () {
  this._sprites.forEach(function (sprite) {
    sprite.update();
  });
};
