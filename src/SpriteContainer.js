function SpriteContainer(eventManager) {
  this._eventManager = eventManager;
  eventManager.addSubscriber(this, [Sprite.Event.CREATED, Sprite.Event.DESTROYED]);
  this._sprites = [];
}

SpriteContainer.prototype.addSprite = function (sprite) {
  this._sprites.push(sprite);
};

SpriteContainer.prototype.removeSprite = function (sprite) {
  arrayRemove(this._sprites, sprite);
};

SpriteContainer.prototype.containsSprite = function (sprite) {
  return arrayContains(this._sprites, sprite);
};

SpriteContainer.prototype.getSprites = function () {
  return this._sprites;
};

SpriteContainer.prototype.notify = function (event) {
  if (event.name == Sprite.Event.CREATED) {
    this.addSprite(event.sprite);
  }
  else if (event.name == Sprite.Event.DESTROYED) {
    this.removeSprite(event.sprite);
  }
};
