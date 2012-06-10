function TankController(eventManager, tank) {
  SpriteController.call(this, eventManager, tank);
}

TankController.subclass(SpriteController);

TankController.prototype._keyPressed = function (key) {
  SpriteController.prototype._keyPressed.call(this, key);
  
  if (key == Keyboard.Key.SPACE) {
    this._sprite.shoot();
  }
};
