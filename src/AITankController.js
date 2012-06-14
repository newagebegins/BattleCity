function AITankController(tank, random) {
  this._tank = tank;
  this._random = random;
  this._eventManager = this._tank.getEventManager();
  
  this._eventManager.addSubscriber(this, [Tank.Event.DESTROYED]);
  
  this._shootInterval = 30;
  this._shootTimer = 0;
  this._shootProbability = 0.5;
  
  this._eventManager.fireEvent({'name': AITankController.Event.CREATED, 'controller': this});
}

AITankController.Event = {};
AITankController.Event.CREATED = 'AITankController.Event.CREATED';

AITankController.prototype.setShootInterval = function (interval) {
  this._shootInterval = interval;
};

AITankController.prototype.setShootProbability = function (probability) {
  this._shootProbability = probability;
};

AITankController.prototype.updateShoot = function () {
  this._shootTimer++;
  if (this._shootTimer >= this._shootInterval) {
    this._shootTimer = 0;
    if (this._random.getNumber() < this._shootProbability) {
      this._tank.shoot();
    }
  }
};

AITankController.prototype.update = function () {
  this.updateShoot();
};
