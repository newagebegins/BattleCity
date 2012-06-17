function PowerUpHandler(eventManager) {
  this._eventManager = eventManager;
  eventManager.addSubscriber(this, [PowerUp.Event.DESTROYED]);
  
  this._spriteContainer = null;
  this._baseWallBuilder = null;
}

PowerUpHandler.Event = {};
PowerUpHandler.Event.FREEZE = 'PowerUpHandler.Event.FREEZE';

PowerUpHandler.prototype.setSpriteContainer = function (container) {
  this._spriteContainer = container;
};

PowerUpHandler.prototype.setBaseWallBuilder = function (builder) {
  this._baseWallBuilder = builder;
};

PowerUpHandler.prototype.notify = function (event) {
  if (event.name == PowerUp.Event.DESTROYED) {
    this.handle(event.powerUp);
  }
};

PowerUpHandler.prototype.handle = function (powerUp) {
  if (powerUp.getType() == PowerUp.Type.GRENADE) {
    this.handleGrenade();
  }
  else if (powerUp.getType() == PowerUp.Type.HELMET) {
    this.handleHelmet(powerUp.getPlayerTank());
  }
  else if (powerUp.getType() == PowerUp.Type.TIMER) {
    this.handleTimer();
  }
  else if (powerUp.getType() == PowerUp.Type.SHOVEL) {
    this.handleShovel();
  }
};

PowerUpHandler.prototype.handleGrenade = function () {
  this._spriteContainer.getEnemyTanks().forEach(function (tank) {
    tank.setValue(0);
    tank.destroy();
  });
};

PowerUpHandler.prototype.handleHelmet = function (playerTank) {
  var state = new TankStateInvincible(playerTank);
  state.setStateDuration(Globals.HELMET_DURATION);
  playerTank.setState(state);
};

PowerUpHandler.prototype.handleTimer = function () {
  this._eventManager.fireEvent({'name': PowerUpHandler.Event.FREEZE});
};

PowerUpHandler.prototype.handleShovel = function () {
  this._baseWallBuilder.destroyWall();
  this._baseWallBuilder.setWallFactory(new SteelWallFactory(this._eventManager));
  this._baseWallBuilder.buildWall();
};
