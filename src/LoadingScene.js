function LoadingScene(sceneManager) {
  this._sceneManager = sceneManager;
  this._loadingProgress = 0;
}


LoadingScene.prototype.update = function () {
  this._loadingProgress = ImageManager.getLoadingProgress();
  if (this._loadingProgress == 100) {
    this._sceneManager.toMainMenuScene(false);
  }
};

LoadingScene.prototype.draw = function (ctx) {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  ctx.fillStyle = "#ffffff";
  ctx.fillText("LOADING " + ("" + this._loadingProgress).lpad(" ", 3) + "%", 160, 240);
};
