function SceneManager() {
  this._scene = null;
}

SceneManager.prototype.setScene = function (scene) {
  this._scene = scene;
};

SceneManager.prototype.getScene = function () {
  return this._scene;
};

SceneManager.prototype.toMainMenuScene = function () {
  this._scene = new MainMenuScene();
};

SceneManager.prototype.update = function () {
  this._scene.update();
};

SceneManager.prototype.draw = function (ctx) {
  this._scene.draw(ctx);
};
