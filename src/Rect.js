function Rect(x, y, w, h) {
  Point.call(this, x, y);
  this._w = w || 1;
  this._h = h || 1;
}

Rect.subclass(Point);

Rect.prototype.setRect = function (rect) {
  this._x = rect.getX();
  this._y = rect.getY();
  this._w = rect.getWidth();
  this._h = rect.getHeight();
};

Rect.prototype.getRect = function () {
  return new Rect(this._x, this._y, this._w, this._h);
};

Rect.prototype.setWidth = function (width) {
  this._w = width;
};

Rect.prototype.getWidth = function () {
  return this._w;
};

Rect.prototype.setHeight = function (height) {
  this._h = height;
};

Rect.prototype.getHeight = function () {
  return this._h;
};

Rect.prototype.setDimensions = function (width, height) {
  this._w = width;
  this._h = height;
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

Rect.prototype.getCenter = function () {
  return new Point(this._x + this._w / 2, this._y + this._h / 2);
};
  
Rect.prototype.intersects = function (other) {
  return !(this.getLeft() > other.getRight() ||
    this.getRight() < other.getLeft() ||
    this.getTop() > other.getBottom() ||
    this.getBottom() < other.getTop());
};

Rect.prototype.containsWhole = function (other) {
  return other.getLeft() >= this.getLeft() &&
    other.getRight() <= this.getRight() &&
    other.getBottom() <= this.getBottom() &&
    other.getTop() >= this.getTop();
};
