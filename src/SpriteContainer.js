function SpriteContainer(eventManager) {
  this._eventManager = eventManager;
  eventManager.addSubscriber(this, [Sprite.Event.CREATED, Sprite.Event.DESTROYED]);
  this._sprites = [];
}

SpriteContainer.prototype.addSprite = function (sprite) {
  this._sprites.push(sprite);
  this._sortSpritesByZIndex();
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

SpriteContainer.prototype.getEnemyTanks = function () {
  return this._sprites.filter(function (sprite) {
    return sprite instanceof Tank && sprite.isEnemy();
  });
};

SpriteContainer.prototype.getWalls = function () {
  return this._sprites.filter(function (sprite) {
    return sprite instanceof Wall;
  });
};

SpriteContainer.prototype.getBase = function () {
  for (var i = 0; i < this._sprites.length; ++i) {
    if (this._sprites[i] instanceof Base) {
      return this._sprites[i];
    }
  }
  return null;
};

SpriteContainer.prototype.notify = function (event) {
  if (event.name == Sprite.Event.CREATED) {
    this.addSprite(event.sprite);
  }
  else if (event.name == Sprite.Event.DESTROYED) {
    this.removeSprite(event.sprite);
  }
};

SpriteContainer.prototype._sortSpritesByZIndex = function () {
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
