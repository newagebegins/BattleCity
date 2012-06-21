function OnePlayerMenuItem(sceneManager) {
  MainMenuItem.call(this, sceneManager);
  this.setName("1 PLAYER");
}

OnePlayerMenuItem.subclass(MainMenuItem);

OnePlayerMenuItem.prototype.execute = function () {
  this._sceneManager.toGameScene();
};
