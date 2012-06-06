function CollisionDetector(eventManager, bounds) {
  this._eventManager = eventManager;
  this._bounds = bounds;
  this._objects = [];
}

CollisionDetector.Event = {};
CollisionDetector.Event.COLLISION = 'CollisionDetector.Event.COLLISION';
CollisionDetector.Event.OUT_OF_BOUNDS = 'CollisionDetector.Event.OUT_OF_BOUNDS';

CollisionDetector.prototype.addObject = function (object) {
  this._objects.push(object);
};

CollisionDetector.prototype.notify = function (event) {
  if (event.name == Sprite.Event.MOVED) {
    this._detectCollisionsForSprite(event.sprite);
    this._detectOutOfBoundsForSprite(event.sprite);
  }
};

CollisionDetector.prototype._detectCollisionsForSprite = function (sprite) {
  this._objects.forEach(function (object) {
    if (sprite === object) {
      return;
    }
    if (sprite.intersects(object)) {
      this._eventManager.fireEvent({
        'name': CollisionDetector.Event.COLLISION,
        'initiator': sprite,
        'object': object});
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
