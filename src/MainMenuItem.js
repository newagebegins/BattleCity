function MainMenuItem(sceneManager) {
  this._sceneManager = sceneManager;
  this._name = '';
}

MainMenuItem.prototype.setName = function (name) {
  this._name = name;
};

MainMenuItem.prototype.getName = function () {
  return this._name;
};

MainMenuItem.prototype.execute = function () {
  // Should be overriden by subclasses.
};
