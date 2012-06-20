function ConstructionMenuItem(sceneManager) {
  MainMenuItem.call(this, sceneManager);
  this.setName("CONSTRUCTION");
}

ConstructionMenuItem.subclass(MainMenuItem);

ConstructionMenuItem.prototype.execute = function () {
  this._sceneManager.toConstructionScene();
};
