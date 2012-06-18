function SpriteController(eventManager, sprite) {
  this._eventManager = eventManager;
  this._eventManager.addSubscriber(this, [Keyboard.Event.KEY_PRESSED, Keyboard.Event.KEY_RELEASED]);
  this._sprite = sprite;
  this._pauseListener = new PauseListener(this._eventManager);
}

SpriteController.prototype.notify = function (event) {
  if (event.name == Keyboard.Event.KEY_PRESSED && !this._pauseListener.isPaused()) {
    this.keyPressed(event.key);
  }
  else if (event.name == Keyboard.Event.KEY_RELEASED) {
    this.keyReleased(event.key);
  }
};

SpriteController.prototype.keyPressed = function (key) {
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

SpriteController.prototype.keyReleased = function (key) {
  if (this._sprite.getDirection() == Sprite.Direction.LEFT && key == Keyboard.Key.LEFT ||
      this._sprite.getDirection() == Sprite.Direction.RIGHT && key == Keyboard.Key.RIGHT ||
      this._sprite.getDirection() == Sprite.Direction.UP && key == Keyboard.Key.UP ||
      this._sprite.getDirection() == Sprite.Direction.DOWN && key == Keyboard.Key.DOWN) {
    this._sprite.stop();
  }
};
