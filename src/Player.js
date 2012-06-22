function Player(eventManager, lives, score) {
  this._eventManager = eventManager;
  this._eventManager.addSubscriber(this, [Tank.Event.ENEMY_DESTROYED]);
  
  this._lives = lives;
  this._score = score;
  
  this._tanks = {};
  this._tanks[Tank.Type.BASIC] = 0;
  this._tanks[Tank.Type.FAST] = 0;
  this._tanks[Tank.Type.POWER] = 0;
  this._tanks[Tank.Type.ARMOR] = 0;
}

Player.prototype.notify = function (event) {
  if (event.name == Tank.Event.ENEMY_DESTROYED) {
    if (event.tank.getValue() > 0) {
      this._tanks[event.tank.getType()]++;
    }
  }
};

Player.prototype.getScore = function () {
  return this._score.getValue();
};
