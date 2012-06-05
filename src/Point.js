function Point(x, y) {
  this._x = x === undefined ? 0 : x;
  this._y = y === undefined ? 0 : y;
}

Point.prototype.getX = function () {
  return this._x;
};
  
Point.prototype.getY = function () {
  return this._y;
};

Point.prototype.getPosition = function () {
  return new Point(this._x, this._y);
};

Point.prototype.setPosition = function (x, y) {
  this._x = x;
  this._y = y;
};
