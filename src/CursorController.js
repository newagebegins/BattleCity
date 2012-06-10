function CursorController(eventManager, cursor) {
  this._eventManager = eventManager;
  this._eventManager.addSubscriber(this, [Keyboard.Event.KEY_PRESSED, Keyboard.Event.KEY_RELEASED]);
  this._cursor = cursor;
}

CursorController.prototype.notify = function (event) {
  if (event.name == Keyboard.Event.KEY_PRESSED) {
    this._keyPressed(event.key);
  }
  else if (event.name == Keyboard.Event.KEY_RELEASED) {
    this._keyReleased(event.key);
  }
};

CursorController.prototype._keyPressed = function (key) {
  if (key == Keyboard.Key.LEFT) {
    this._cursor.setDirection(Sprite.Direction.LEFT);
    this._cursor.toNormalSpeed();
  }
  else if (key == Keyboard.Key.RIGHT) {
    this._cursor.setDirection(Sprite.Direction.RIGHT);
    this._cursor.toNormalSpeed();
  }
  else if (key == Keyboard.Key.UP) {
    this._cursor.setDirection(Sprite.Direction.UP);
    this._cursor.toNormalSpeed();
  }
  else if (key == Keyboard.Key.DOWN) {
    this._cursor.setDirection(Sprite.Direction.DOWN);
    this._cursor.toNormalSpeed();
  }
};

CursorController.prototype._keyReleased = function (key) {
  if (this._cursor.getDirection() == Sprite.Direction.LEFT && key == Keyboard.Key.LEFT ||
      this._cursor.getDirection() == Sprite.Direction.RIGHT && key == Keyboard.Key.RIGHT ||
      this._cursor.getDirection() == Sprite.Direction.UP && key == Keyboard.Key.UP ||
      this._cursor.getDirection() == Sprite.Direction.DOWN && key == Keyboard.Key.DOWN) {
    this._cursor.stop();
  }
};
