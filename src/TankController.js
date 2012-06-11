function TankController(eventManager, tank) {
  SpriteController.call(this, eventManager, tank);
}

TankController.subclass(SpriteController);

TankController.prototype.keyPressed = function (key) {
  SpriteController.prototype.keyPressed.call(this, key);
  
  if (key == Keyboard.Key.SPACE) {
    this._sprite.shoot();
  }
};
