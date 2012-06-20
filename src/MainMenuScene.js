function MainMenuScene() {
  this._y = Globals.CANVAS_HEIGHT;
  this._speed = 3;
}

MainMenuScene.prototype.setY = function (y) {
  this._y = y;
};

MainMenuScene.prototype.getY = function () {
  return this._y;
};

MainMenuScene.prototype.setSpeed = function (speed) {
  this._speed = speed;
};

MainMenuScene.prototype.updatePosition = function () {
  this._y -= this._speed;
  if (this._y < 0) {
    this._y = 0;
  }
};

MainMenuScene.prototype.update = function () {
  this.updatePosition();
};

MainMenuScene.prototype.draw = function (ctx) {
  this._clearCanvas(ctx);
  ctx.drawImage(ImageManager.getImage('battle_city'), 56, this._y + 80);
};

MainMenuScene.prototype._clearCanvas = function (ctx) {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};
