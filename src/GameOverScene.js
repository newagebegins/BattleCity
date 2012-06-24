function GameOverScene(sceneManager) {
  this._sceneManager = sceneManager;
  
  this._script = new Script();
  this._script.enqueue(new Delay(this._script, 10));
  this._script.enqueue({execute: function () {SoundManager.play("game_over");}});
  this._script.enqueue(new Delay(this._script, 100));
  this._script.enqueue({execute: function () {sceneManager.toMainMenuScene();}});
};

GameOverScene.prototype.update = function () {
  this._script.update();
};

GameOverScene.prototype.draw = function (ctx) {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  ctx.drawImage(ImageManager.getImage('game_over'), 128, 128);
};
