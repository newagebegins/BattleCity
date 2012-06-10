function SpriteController(eventManager, sprite) {
  this._eventManager = eventManager;
  this._eventManager.addSubscriber(this, [Keyboard.Event.KEY_PRESSED, Keyboard.Event.KEY_RELEASED]);
  this._sprite = sprite;
}

SpriteController.prototype.notify = function (event) {
  if (event.name == Keyboard.Event.KEY_PRESSED) {
    this._keyPressed(event.key);
  }
  else if (event.name == Keyboard.Event.KEY_RELEASED) {
    this._keyReleased(event.key);
  }
};

SpriteController.prototype._keyPressed = function (key) {
  if (key == Keyboard.Key.LEFT) {
    this._sprite.setDirection(Sprite.Direction.LEFT);
    this._sprite.toNormalSpeed();
  }
  else if (key == Keyboard.Key.RIGHT) {
    this._sprite.setDirection(Sprite.Direction.RIGHT);
    this._sprite.toNormalSpeed();
  }
  else if (key == Keyboard.Key.UP) {
    this._sprite.setDirection(Sprite.Direction.UP);
    this._sprite.toNormalSpeed();
  }
  else if (key == Keyboard.Key.DOWN) {
    this._sprite.setDirection(Sprite.Direction.DOWN);
    this._sprite.toNormalSpeed();
  }
};

SpriteController.prototype._keyReleased = function (key) {
  if (this._sprite.getDirection() == Sprite.Direction.LEFT && key == Keyboard.Key.LEFT ||
      this._sprite.getDirection() == Sprite.Direction.RIGHT && key == Keyboard.Key.RIGHT ||
      this._sprite.getDirection() == Sprite.Direction.UP && key == Keyboard.Key.UP ||
      this._sprite.getDirection() == Sprite.Direction.DOWN && key == Keyboard.Key.DOWN) {
    this._sprite.stop();
  }
};
