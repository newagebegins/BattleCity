function SteelWall(eventManager) {
  Wall.call(this, eventManager);
}

SteelWall.subclass(Wall);

SteelWall.prototype.draw = function (ctx) {
  ctx.drawImage(ImageManager.getImage('wall_steel'), this._x, this._y);
};
