function CursorController(eventManager, cursor) {
  SpriteController.call(this, eventManager, cursor);
  this._eventManager.addSubscriber(this, [Cursor.Event.MOVED]);
  this._spacePressed = false;
}

CursorController.subclass(SpriteController);

CursorController.prototype.notify = function (event) {
  SpriteController.prototype.notify.call(this, event);
  
  if (event.name == Cursor.Event.MOVED && this._spacePressed) {
    event.cursor.build();
  }
};

CursorController.prototype.keyPressed = function (key) {
  SpriteController.prototype.keyPressed.call(this, key);
  
  if (key == Keyboard.Key.SPACE && !this._spacePressed) {
    this._spacePressed = true;
    this._sprite.build();
  }
};

CursorController.prototype.keyReleased = function (key) {
  SpriteController.prototype.keyReleased.call(this, key);
  
  if (key == Keyboard.Key.SPACE) {
    this._spacePressed = false;
  }
};
