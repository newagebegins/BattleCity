function CollisionDetector(eventManager, bounds) {
  this._eventManager = eventManager;
  this._bounds = bounds;
  this._sprites = [];
}

CollisionDetector.Event = {};
CollisionDetector.Event.COLLISION = 'CollisionDetector.Event.COLLISION';
CollisionDetector.Event.OUT_OF_BOUNDS = 'CollisionDetector.Event.OUT_OF_BOUNDS';

CollisionDetector.prototype.addSprite = function (sprite) {
  this._sprites.push(sprite);
};

CollisionDetector.prototype.containsSprite = function (sprite) {
  return arrayContains(this._sprites, sprite);
};

CollisionDetector.prototype.notify = function (event) {
  if (event.name == Sprite.Event.MOVED) {
    this._detectCollisionsForSprite(event.sprite);
    this._detectOutOfBoundsForSprite(event.sprite);
  }
  else if (event.name == Sprite.Event.DESTROYED) {
    arrayRemove(this._sprites, event.sprite);
  }
};

CollisionDetector.prototype._detectCollisionsForSprite = function (sprite) {
  this._sprites.forEach(function (other) {
    if (sprite === other) {
      return;
    }
    if (sprite.intersects(other)) {
      this._eventManager.fireEvent({
        'name': CollisionDetector.Event.COLLISION,
        'initiator': sprite,
        'sprite': other});
    }
  }, this);
};

CollisionDetector.prototype._detectOutOfBoundsForSprite = function (sprite) {
  if (!this._bounds.containsWhole(sprite)) {
    this._eventManager.fireEvent({
        'name': CollisionDetector.Event.OUT_OF_BOUNDS,
        'sprite': sprite});
  }
};
