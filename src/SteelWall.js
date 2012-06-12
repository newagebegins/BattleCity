function SteelWall(eventManager) {
  Wall.call(this, eventManager);
}

SteelWall.subclass(Wall);

SteelWall.prototype.getClassName = function () {
  return 'SteelWall';
};

SteelWall.prototype.draw = function (ctx) {
  ctx.drawImage(ImageManager.getImage('wall_steel'), this._x, this._y);
};
