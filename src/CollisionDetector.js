function CollisionDetector(eventManager, bounds) {
  SpriteContainer.call(this, eventManager);
  this._bounds = bounds;
}

CollisionDetector.subclass(SpriteContainer);

CollisionDetector.Event = {};
CollisionDetector.Event.COLLISION = 'CollisionDetector.Event.COLLISION';
CollisionDetector.Event.OUT_OF_BOUNDS = 'CollisionDetector.Event.OUT_OF_BOUNDS';

CollisionDetector.prototype.notify = function (event) {
  SpriteContainer.prototype.notify.call(this, event);
  
  if (event.name == Sprite.Event.MOVED) {
    this._detectCollisionsForSprite(event.sprite);
    this._detectOutOfBoundsForSprite(event.sprite);
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
