function AITankControllerContainer(eventManager) {
  this._eventManager = eventManager;
  eventManager.addSubscriber(this, [AITankController.Event.CREATED, AITankController.Event.DESTROYED]);
  this._controllers = [];
}

AITankControllerContainer.prototype.addController = function (controller) {
  this._controllers.push(controller);
};

AITankControllerContainer.prototype.removeController = function (controller) {
  arrayRemove(this._controllers, controller);
};

AITankControllerContainer.prototype.containsController = function (controller) {
  return arrayContains(this._controllers, controller);
};

AITankControllerContainer.prototype.getControllers = function () {
  return this._controllers;
};

AITankControllerContainer.prototype.notify = function (event) {
  if (event.name == AITankController.Event.CREATED) {
    this.addController(event.controller);
  }
  else if (event.name == AITankController.Event.DESTROYED) {
    this.removeController(event.controller);
  }
};

AITankControllerContainer.prototype.update = function () {
  this._controllers.forEach(function (controller) {
    controller.update();
  });
};
