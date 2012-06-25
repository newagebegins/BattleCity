function AITankController(tank, random, spriteContainer) {
  this._tank = tank;
  this._random = random;
  this._spriteContainer = spriteContainer;
  this._eventManager = this._tank.getEventManager();
  this._pauseListener = new PauseListener(this._eventManager);
  
  this._eventManager.addSubscriber(this,
    [Tank.Event.DESTROYED, PowerUpHandler.Event.FREEZE, FreezeTimer.Event.UNFREEZE]);
  
  this._tank.toNormalSpeed();
  
  this._shootInterval = 15;
  this._shootTimer = 0;
  this._shootProbability = 0.7;
  
  this._directionUpdateInterval = 20;
  this._directionTimer = 0;
  this._directionUpdateProbability = 0.6;
  
  this._eventManager.fireEvent({'name': AITankController.Event.CREATED, 'controller': this});
  
  this._freezed = false;
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
      var base = this._spriteContainer.getBase();
      var n = this._random.getNumber();
      var dir = Sprite.Direction.DOWN;
      
      if (base.getY() > this._tank.getY()) {
        dir = Sprite.Direction.DOWN;
        if (n < 0.4) {
          dir = arrayRandomElement([Sprite.Direction.UP, Sprite.Direction.LEFT, Sprite.Direction.RIGHT]);
        }
      }
      else if (base.getY() == this._tank.getY()) {
        if (base.getX() < this._tank.getX()) {
          dir = Sprite.Direction.LEFT;
          if (n < 0.4) {
            dir = arrayRandomElement([Sprite.Direction.UP, Sprite.Direction.DOWN, Sprite.Direction.RIGHT]);
          }
        }
        else if (base.getX() > this._tank.getX()) {
          dir = Sprite.Direction.RIGHT;
          if (n < 0.4) {
            dir = arrayRandomElement([Sprite.Direction.UP, Sprite.Direction.LEFT, Sprite.Direction.DOWN]);
          }
        }
      }
      else {
        dir = arrayRandomElement([Sprite.Direction.UP, Sprite.Direction.DOWN, Sprite.Direction.LEFT, Sprite.Direction.RIGHT]);
      }
      
      this._tank.setDirection(dir);
    }
  }
};

AITankController.prototype.update = function () {
  if (this._freezed || this._pauseListener.isPaused()) {
    return;
  }
  this.updateShoot();
  this.updateDirection();
};

AITankController.prototype.notify = function (event) {
  if (event.name == Tank.Event.DESTROYED && event.tank === this._tank) {
    this.destroy();
  }
  else if (event.name == PowerUpHandler.Event.FREEZE) {
    this.freeze();
  }
  else if (event.name == FreezeTimer.Event.UNFREEZE) {
    this.unfreeze();
  }
};

AITankController.prototype.destroy = function () {
  this._pauseListener.destroy();
  this._eventManager.removeSubscriber(this);
  this._eventManager.fireEvent({'name': AITankController.Event.DESTROYED, 'controller': this});
};

AITankController.prototype.isFreezed = function () {
  return this._freezed;
};

AITankController.prototype.freeze = function () {
  this._freezed = true;
  this._tank.stop();
};

AITankController.prototype.unfreeze = function () {
  this._freezed = false;
  this._tank.toNormalSpeed();
};

AITankController.prototype.setPauseListener = function (listener) {
  this._pauseListener.destroy();
  this._pauseListener = listener;
};
