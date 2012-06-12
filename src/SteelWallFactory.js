function SteelWallFactory(eventManager) {
  this._eventManager = eventManager;
}

SteelWallFactory.prototype.create = function () {
  return new SteelWall(this._eventManager);
};
