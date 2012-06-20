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
  
  ctx.fillStyle = "#ffffff";
  
  ctx.fillText("1 PLAYER", 178, this._y + 270);
  ctx.fillText("2 PLAYERS", 178, this._y + 302);
  ctx.fillText("CONSTRUCTION", 178, this._y + 334);
  
  ctx.drawImage(ImageManager.getImage('roman_one_white'), 36, this._y + 32);
  ctx.fillText("-    00", 50, this._y + 46);
  
  ctx.fillText("HI- 20000", 178, this._y + 46);
  
  ctx.drawImage(ImageManager.getImage('namcot'), 176, this._y + 352);
  
  ctx.drawImage(ImageManager.getImage('copyright'), 64, this._y + 384);
  ctx.fillText("1980 1985 NAMCO LTD.", 98, this._y + 398);
  ctx.fillText("ALL RIGHTS RESERVED", 98, this._y + 430);
};

MainMenuScene.prototype._clearCanvas = function (ctx) {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};
