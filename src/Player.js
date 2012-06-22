function Player() {
  this._lives = 2;
  this._score = 0;
  this.resetTanks();
}

Player.Event = {};
Player.Event.OUT_OF_LIVES = 'Player.Event.OUT_OF_LIVES';

Player.prototype.resetTanks = function () {
  this._tanks = {};
  this._tanks[Tank.Type.BASIC] = 0;
  this._tanks[Tank.Type.FAST] = 0;
  this._tanks[Tank.Type.POWER] = 0;
  this._tanks[Tank.Type.ARMOR] = 0;
  this._tanksCount = 0;
};

Player.prototype.setEventManager = function (eventManager) {
  this._eventManager = eventManager;
  this._eventManager.addSubscriber(this, [
    PointsFactory.Event.POINTS_CREATED,
    Tank.Event.PLAYER_DESTROYED,
    PowerUpHandler.Event.TANK,
    Tank.Event.ENEMY_DESTROYED
  ]);
};

Player.prototype.notify = function (event) {
  if (event.name == PointsFactory.Event.POINTS_CREATED) {
    this._score += event.points.getValue();
  }
  else if (event.name == Tank.Event.PLAYER_DESTROYED) {
    if (this._lives == 0) {
      this._eventManager.fireEvent({'name': Player.Event.OUT_OF_LIVES});
    }
    else {
      this._lives--;
    }
  }
  else if (event.name == PowerUpHandler.Event.TANK) {
    this._lives++;
  }
  else if (event.name == Tank.Event.ENEMY_DESTROYED) {
    if (event.tank.getValue() > 0) {
      this._tanks[event.tank.getType()]++;
      this._tanksCount++;
    }
  }
};

Player.prototype.getScore = function () {
  return this._score;
};

Player.prototype.getLives = function () {
  return this._lives;
};

Player.prototype.getTanks = function (type) {
  return this._tanks[type];
};

Player.prototype.getTanksCount = function () {
  return this._tanksCount;
};
