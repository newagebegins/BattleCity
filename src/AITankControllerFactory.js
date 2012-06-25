function AITankControllerFactory(eventManager, spriteContainer) {
  this._eventManager = eventManager;
  this._eventManager.addSubscriber(this,
    [EnemyFactory.Event.ENEMY_CREATED, PowerUpHandler.Event.FREEZE, FreezeTimer.Event.UNFREEZE]);
  this._freezed = false;
  this._spriteContainer = spriteContainer;
}

AITankControllerFactory.prototype.notify = function (event) {
  if (event.name == EnemyFactory.Event.ENEMY_CREATED) {
    this.createController(event.enemy);
  }
  else if (event.name == PowerUpHandler.Event.FREEZE) {
    this.freeze();
  }
  else if (event.name == FreezeTimer.Event.UNFREEZE) {
    this.unfreeze();
  }
};

AITankControllerFactory.prototype.createController = function (tank) {
  var controller = new AITankController(tank, new Random(), this._spriteContainer);
  if (this.isFreezed()) {
    controller.freeze();
  }
  return controller;
};

AITankControllerFactory.prototype.isFreezed = function () {
  return this._freezed;
};

AITankControllerFactory.prototype.freeze = function () {
  this._freezed = true;
};

AITankControllerFactory.prototype.unfreeze = function () {
  this._freezed = false;
};
