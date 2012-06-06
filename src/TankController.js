function TankController(tank) {
  this._tank = tank;
}

TankController.prototype.notify = function (event) {
  if (event.name == Keyboard.Event.KEY_PRESSED) {
    this._keyPressed(event.key);
  }
  else if (event.name == Keyboard.Event.KEY_RELEASED) {
    this._keyReleased(event.key);
  }
};

TankController.prototype._keyPressed = function (key) {
  if (key == Keyboard.Key.LEFT) {
    this._tank.setDirection(Tank.Direction.LEFT);
    this._tank.toNormalSpeed();
  }
  else if (key == Keyboard.Key.RIGHT) {
    this._tank.setDirection(Tank.Direction.RIGHT);
    this._tank.toNormalSpeed();
  }
  else if (key == Keyboard.Key.UP) {
    this._tank.setDirection(Tank.Direction.UP);
    this._tank.toNormalSpeed();
  }
  else if (key == Keyboard.Key.DOWN) {
    this._tank.setDirection(Tank.Direction.DOWN);
    this._tank.toNormalSpeed();
  }
  else if (key == Keyboard.Key.SPACE) {
    this._tank.shoot();
  }
};

TankController.prototype._keyReleased = function (key) {
  if (this._tank.getDirection() == Tank.Direction.LEFT && key == Keyboard.Key.LEFT ||
      this._tank.getDirection() == Tank.Direction.RIGHT && key == Keyboard.Key.RIGHT ||
      this._tank.getDirection() == Tank.Direction.UP && key == Keyboard.Key.UP ||
      this._tank.getDirection() == Tank.Direction.DOWN && key == Keyboard.Key.DOWN) {
    this._tank.stop();
  }
};
