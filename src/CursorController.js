function CursorController(eventManager, cursor) {
  SpriteController.call(this, eventManager, cursor);
}

CursorController.subclass(SpriteController);

CursorController.prototype.keyReleased = function (key) {
  SpriteController.prototype.keyReleased.call(this, key);
  
  if (key == Keyboard.Key.SPACE) {
    this._sprite.build();
  }
};
