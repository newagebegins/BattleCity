function BrickWallFactory(eventManager) {
  this._eventManager = eventManager;
}

BrickWallFactory.prototype.create = function () {
  return new BrickWall(this._eventManager);
};
