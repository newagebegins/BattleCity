function BaseWallBuilder() {
  this._positions = [];
  this._factory = null;
  this._spriteContainer = null
}

BaseWallBuilder.prototype.setWallPositions = function (positions) {
  this._positions = positions;
};

BaseWallBuilder.prototype.setWallFactory = function (factory) {
  this._factory = factory;
};

BaseWallBuilder.prototype.setSpriteContainer = function (container) {
  this._spriteContainer = container;
};

BaseWallBuilder.prototype.buildWall = function () {
  this._positions.forEach(function (position) {
    var wall = this._factory.create();
    wall.setPosition(position);
  }, this);
};

BaseWallBuilder.prototype.destroyWall = function () {
  this._spriteContainer.getWalls().forEach(function (wall) {
    for (var i = 0; i < this._positions.length; ++i) {
      var position = this._positions[i];
      if (wall.getX() == position.getX() && wall.getY() == position.getY()) {
        wall.destroy();
        break;
      }
    } 
  }, this);
};
