function PowerUpFactory(eventManager) {
  this._eventManager = eventManager;
  this._eventManager.addSubscriber(this, [Tank.Event.FLASHING_TANK_DESTROYED]);
  this._positions = [];
}

PowerUpFactory.prototype.notify = function (event) {
  if (event.name == Tank.Event.FLASHING_TANK_DESTROYED) {
    this.create();
  }
};

PowerUpFactory.prototype.setPositions = function (positions) {
  this._positions = positions;
};

PowerUpFactory.prototype.create = function () {
  var powerUp = new PowerUp(this._eventManager);
  var types = [
    PowerUp.Type.GRENADE,
    PowerUp.Type.HELMET,
    PowerUp.Type.SHOVEL,
    PowerUp.Type.STAR,
    PowerUp.Type.TANK,
    PowerUp.Type.TIMER
  ];
  powerUp.setType(arrayRandomElement(types));
  powerUp.setPosition(arrayRandomElement(this._positions));
  
  SoundManager.play("powerup_appear");
  
  return powerUp;
};
