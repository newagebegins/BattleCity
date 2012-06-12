function StructureManager(eventManager) {
  this._eventManager = eventManager;
  this._eventManager.addSubscriber(this,
    [Builder.Event.STRUCTURE_CREATED, Sprite.Event.DESTROYED]);
  this._sprites = [];
}

StructureManager.prototype.destroySpritesUnderCursor = function (cursor) {
  var cursorRect = cursor.getRect();
  
  this._sprites.forEach(function (sprite) {
    if (sprite.intersects(cursorRect)) {
      sprite.destroy();
    }
  });
};

StructureManager.prototype.removeSprite = function (sprite) {
  arrayRemove(this._sprites, sprite);
};

StructureManager.prototype.addStructure = function (structure) {
  structure.forEach(function (sprite) {
    this.addSprite(sprite);
  }, this);
};

StructureManager.prototype.addSprite = function (sprite) {
  this._sprites.push(sprite);
};

StructureManager.prototype.containsSprite = function (sprite) {
  return arrayContains(this._sprites, sprite);
};

StructureManager.prototype.getSprites = function () {
  return this._sprites;
};

StructureManager.prototype.notify = function (event) {
  if (event.name == Builder.Event.STRUCTURE_CREATED) {
    this.destroySpritesUnderCursor(event.cursor);
    this.addStructure(event.structure);
  }
  else if (event.name == Sprite.Event.DESTROYED) {
    this.removeSprite(event.sprite);
  }
};
