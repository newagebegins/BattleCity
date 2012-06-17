function AITankControllerFactory(eventManager) {
  this._eventManager = eventManager;
  this._eventManager.addSubscriber(this, [EnemyFactory.Event.ENEMY_CREATED]);
}

AITankControllerFactory.prototype.notify = function (event) {
  if (event.name == EnemyFactory.Event.ENEMY_CREATED) {
    this.createController(event.enemy);
  }
};

AITankControllerFactory.prototype.createController = function (tank) {
  return new AITankController(tank, new Random());
};
