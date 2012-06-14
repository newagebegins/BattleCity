function AITankController(tank, random) {
  this._tank = tank;
  this._random = random;
  
  this._shootInterval = 30;
  this._shootTimer = 0;
  this._shootProbability = 0.5;
}

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
