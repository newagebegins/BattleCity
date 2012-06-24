function PowerUpHandler(eventManager) {
  this._eventManager = eventManager;
  eventManager.addSubscriber(this, [PowerUp.Event.PICK]);
  
  this._spriteContainer = null;
}

PowerUpHandler.Event = {};
PowerUpHandler.Event.FREEZE = 'PowerUpHandler.Event.FREEZE';
PowerUpHandler.Event.SHOVEL_START = 'PowerUpHandler.Event.SHOVEL_START';
PowerUpHandler.Event.TANK = 'PowerUpHandler.Event.TANK';

PowerUpHandler.HELMET_DURATION = 345;

PowerUpHandler.prototype.setSpriteContainer = function (container) {
  this._spriteContainer = container;
};

PowerUpHandler.prototype.notify = function (event) {
  if (event.name == PowerUp.Event.PICK) {
    this.handle(event.powerUp);
  }
};

PowerUpHandler.prototype.handle = function (powerUp) {
  SoundManager.play("powerup_pick");
  
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
  else if (powerUp.getType() == PowerUp.Type.STAR) {
    this.handleStar(powerUp.getPlayerTank());
  }
  else if (powerUp.getType() == PowerUp.Type.TANK) {
    this.handleTank();
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
  state.setStateDuration(PowerUpHandler.HELMET_DURATION);
  playerTank.setState(state);
};

PowerUpHandler.prototype.handleTimer = function () {
  this._eventManager.fireEvent({'name': PowerUpHandler.Event.FREEZE});
};

PowerUpHandler.prototype.handleShovel = function () {
  this._eventManager.fireEvent({'name': PowerUpHandler.Event.SHOVEL_START});
};

PowerUpHandler.prototype.handleStar = function (playerTank) {
  playerTank.upgrade();
};

PowerUpHandler.prototype.handleTank = function () {
  this._eventManager.fireEvent({'name': PowerUpHandler.Event.TANK});
};
