function Curtain() {
  this._height = Globals.CANVAS_HEIGHT / 2;
  this._speed = 15;
  this._position = 0;
}

Curtain.prototype.setHeight = function (height) {
  this._height = height;
};

Curtain.prototype.setSpeed = function (speed) {
  this._speed = speed;
};

Curtain.prototype.getPosition = function () {
  return this._position;
};

Curtain.prototype.setPosition = function (position) {
  this._position = position;
};

Curtain.prototype.fall = function () {
  if (this.isFallen()) {
    return;
  }
  
  this._position += this._speed;
  
  if (this.isFallen()) {
    this._position = this._height;
  }
};

Curtain.prototype.rise = function () {
  if (this.isRisen()) {
    return;
  }
  
  this._position -= this._speed;
  
  if (this.isRisen()) {
    this._position = 0;
  }
};

Curtain.prototype.isFallen = function () {
  return this._position >= this._height;
};

Curtain.prototype.isRisen = function () {
  return this._position <= 0;
};

Curtain.prototype.draw = function (ctx) {
  ctx.fillStyle = "#808080";
  ctx.fillRect(0, 0, Globals.CANVAS_WIDTH, this._position);
  ctx.fillRect(0, Globals.CANVAS_HEIGHT - this._position, Globals.CANVAS_WIDTH, Globals.CANVAS_HEIGHT);
}; 
