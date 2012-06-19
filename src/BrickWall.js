function BrickWall(eventManager) {
  Wall.call(this, eventManager);
}

BrickWall.subclass(Wall);

BrickWall.prototype.getClassName = function () {
  return 'BrickWall';
};

BrickWall.prototype.getImage = function () {
  return 'wall_brick';
};
