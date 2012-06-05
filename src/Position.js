function Position(x, y) {
  this._x = x;
  this._y = y;
}

Position.prototype = {
  getX: function () {
    return this._x;
  },
  
  getY: function () {
    return this._y;
  }
};
