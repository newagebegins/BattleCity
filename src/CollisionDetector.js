function CollisionDetector(eventManager) {
  this._eventManager = eventManager;
  this._eventManager.addSubscriber(this, [Sprite.Event.MOVED])
  this._objects = [];
}

CollisionDetector.Event = {};
CollisionDetector.Event.COLLISION = 'CollisionDetector.Event.COLLISION';

CollisionDetector.prototype.addObject = function (object) {
  this._objects.push(object);
};

CollisionDetector.prototype.notify = function (event) {
  if (event.name == Sprite.Event.MOVED) {
    this._detectCollisionsForSprite(event.sprite);
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
