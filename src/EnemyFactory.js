function EnemyFactory(eventManager) {
  this._eventManager = eventManager;
  this._eventManager.addSubscriber(this, [Tank.Event.DESTROYED]);
  
  this._positions = [];
  this._position = 0;
  
  this._interval = 100;
  this._timer = this._interval;
  
  this._enemies = [];
  this._enemy = 0;
}

EnemyFactory.prototype.setEnemies = function (enemies) {
  this._enemies = enemies;
};

EnemyFactory.prototype.setPositions = function (positions) {
  this._positions = positions;
};

EnemyFactory.prototype.update = function () {
  this._timer++;
  if (this._timer > this._interval) {
    this._timer = 0;
    this.create();
  }
};

EnemyFactory.prototype.getNextPosition = function () {
  return this._positions[this._position];
};

EnemyFactory.prototype.nextPosition = function () {
  this._position++;
  if (this._position >= this._positions.length) {
    this._position = 0;
  }
};

EnemyFactory.prototype.create = function () {
  this.createEnemy(this.getNextEnemy(), this.getNextPosition());
  this.nextEnemy();
  this.nextPosition();
};

EnemyFactory.prototype.setInterval = function (interval) {
  this._interval = interval;
  this._timer = this._interval;
};

EnemyFactory.prototype.createEnemy = function (enemy, position) {
  var tank = new Tank(this._eventManager);
  tank.setType(enemy.type);
  tank.setPosition(position);
  return tank;
};

EnemyFactory.prototype.getNextEnemy = function () {
  return this._enemies[this._enemy];
};

EnemyFactory.prototype.nextEnemy = function () {
  this._enemy++;
};
