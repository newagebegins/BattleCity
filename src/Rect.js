function Rect(x, y, w, h) {
  Point.call(this, x, y);
  this._w = w || 1;
  this._h = h || 1;
}

Rect.subclass(Point);

Rect.prototype.setRect = function (x, y, w, h) {
  this._x = x;
  this._y = y;
  this._w = w;
  this._h = h;
};

Rect.prototype.getWidth = function () {
    return this._w;
};

Rect.prototype.getHeight = function () {
    return this._h;
};

Rect.prototype.getLeft = function () {
    return this._x;
};
  
Rect.prototype.getRight = function () {
  return this._x + this._w - 1;
};
  
Rect.prototype.getTop = function () {
  return this._y;
};
  
Rect.prototype.getBottom = function () {
  return this._y + this._h - 1;
};
  
Rect.prototype.intersects = function (other) {
  return !(this.getLeft() > other.getRight() ||
    this.getRight() < other.getLeft() ||
    this.getTop() > other.getBottom() ||
    this.getBottom() < other.getTop());
};
