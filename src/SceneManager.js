function SceneManager(eventManager) {
  this._eventManager = eventManager;
  this._scene = null;
}

SceneManager.prototype.setScene = function (scene) {
  this._scene = scene;
};

SceneManager.prototype.getScene = function () {
  return this._scene;
};

SceneManager.prototype.toMainMenuScene = function () {
  this._scene = new MainMenuScene(this, this._eventManager);
};

SceneManager.prototype.toLevelScene = function () {
};

SceneManager.prototype.toConstructionScene = function () {
};

SceneManager.prototype.update = function () {
  this._scene.update();
};

SceneManager.prototype.draw = function (ctx) {
  this._scene.draw(ctx);
};
