function AITankController(tank, random) {
  this._tank = tank;
  this._random = random;
  this._eventManager = this._tank.getEventManager();
  
  this._eventManager.addSubscriber(this, [Tank.Event.DESTROYED]);
  
  this._tank.toNormalSpeed();
  
  this._shootInterval = 30;
  this._shootTimer = 0;
  this._shootProbability = 0.5;
  
  this._directionUpdateInterval = 20;
  this._directionTimer = 0;
  this._directionUpdateProbability = 0.5;
  
  this._eventManager.fireEvent({'name': AITankController.Event.CREATED, 'controller': this});
}

AITankController.Event = {};
AITankController.Event.CREATED = 'AITankController.Event.CREATED';
AITankController.Event.DESTROYED = 'AITankController.Event.DESTROYED';

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

AITankController.prototype.setDirectionUpdateInterval = function (interval) {
  this._directionUpdateInterval = interval;
};

AITankController.prototype.setDirectionUpdateProbability = function (probability) {
  this._directionUpdateProbability = probability;
};

AITankController.prototype.updateDirection = function () {
  this._directionTimer++;
  if (this._directionTimer >= this._directionUpdateInterval) {
    this._directionTimer = 0;
    if (this._random.getNumber() < this._directionUpdateProbability) {
      this._tank.setDirection(arrayRandomElement([Sprite.Direction.UP, Sprite.Direction.DOWN, Sprite.Direction.LEFT, Sprite.Direction.RIGHT]));
    }
  }
};

AITankController.prototype.update = function () {
  this.updateShoot();
  this.updateDirection();
};

AITankController.prototype.notify = function (event) {
  if (event.name == Tank.Event.DESTROYED && event.tank === this._tank) {
    this.destroy();
  }
};

AITankController.prototype.destroy = function () {
  this._eventManager.removeSubscriber(this);
  this._eventManager.fireEvent({'name': AITankController.Event.DESTROYED, 'controller': this});
};
