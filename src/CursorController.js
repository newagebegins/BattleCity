function CursorController(eventManager, cursor) {
  SpriteController.call(this, eventManager, cursor);
}

CursorController.subclass(SpriteController);

CursorController.prototype._keyReleased = function (key) {
  SpriteController.prototype._keyReleased.call(this, key);
  
  if (key == Keyboard.Key.SPACE) {
    this._sprite.build();
  }
};
