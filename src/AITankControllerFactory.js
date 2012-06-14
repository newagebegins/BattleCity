function AITankControllerFactory(eventManager) {
  this._eventManager = eventManager;
  this._eventManager.addSubscriber(this, [Tank.Event.CREATED]);
}

AITankControllerFactory.prototype.createController = function (tank) {
  return new AITankController(tank, new Random());
};

AITankControllerFactory.prototype.notify = function (event) {
  if (event.name == Tank.Event.CREATED) {
    this.createController(event.tank);
  }
};
