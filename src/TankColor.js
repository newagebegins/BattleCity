function TankColor() {
  this._colors = [[0,0]];
  this._hit = 0;
  this._color = 0;
}

TankColor.prototype.setColors = function (colors) {
  this._colors = colors;
};

TankColor.prototype.getColor = function () {
  return this._colors[this._hit][this._color];
};

TankColor.prototype.update = function () {
  this._color = this._color == 0 ? 1 : 0;
};

TankColor.prototype.hit = function () {
  this._hit++;
  if (this._hit >= this._colors.length) {
    this._hit = this._colors.length - 1;
  }
};
