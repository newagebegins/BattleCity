function Updater(eventManager) {
  SpriteContainer.call(this, eventManager);
}

Updater.subclass(SpriteContainer);

Updater.prototype.update = function () {
  this._sprites.forEach(function (sprite) {
    sprite.update();
  });
};
