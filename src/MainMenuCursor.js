function MainMenuCursor() {
  this._trackAnimation = new Animation([1,2], 2, true);
  this._visible = false;
}

MainMenuCursor.prototype.getTrackFrame = function () {
  return this._trackAnimation.getFrame();
};

MainMenuCursor.prototype.update = function () {
  this._trackAnimation.update();
};

MainMenuCursor.prototype.makeVisible = function () {
  this._visible = true;
};

MainMenuCursor.prototype.isVisible = function () {
  return this._visible;
};
