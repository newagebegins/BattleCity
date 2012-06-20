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

SceneManager.prototype.toMainMenuScene = function (arrived) {
  this._eventManager.removeAllSubscribers();
  this._scene = new MainMenuScene(this);
  
  if (arrived) {
    this._scene.nextMenuItem();
    this._scene.arrived();
  }
};

SceneManager.prototype.toLevelScene = function () {
  this._eventManager.removeAllSubscribers();
  this._scene = new Level(this);
};

SceneManager.prototype.toConstructionScene = function () {
  this._eventManager.removeAllSubscribers();
  this._scene = new Construction(this);
};

SceneManager.prototype.update = function () {
  this._scene.update();
};

SceneManager.prototype.draw = function (ctx) {
  this._scene.draw(ctx);
};

SceneManager.prototype.getEventManager = function () {
  return this._eventManager;
};
