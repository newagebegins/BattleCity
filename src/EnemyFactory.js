function EnemyFactory(eventManager) {
  this._eventManager = eventManager;
  this._eventManager.addSubscriber(this, [Points.Event.DESTROYED, TankExplosion.Event.DESTROYED]);
  
  this._pauseListener = new PauseListener(this._eventManager);
  
  this._positions = [];
  this._position = 0;
  
  this._flashingTanks = [4, 11, 18];
  
  this._interval = 150;
  this._timer = this._interval;
  
  this._enemies = [];
  this._enemy = 0;
  this._enemyCount = 0;
  this._enemyCountLimit = 4;
}

EnemyFactory.Event = {};
EnemyFactory.Event.ENEMY_CREATED = 'EnemyFactory.Event.ENEMY_CREATED';
EnemyFactory.Event.LAST_ENEMY_DESTROYED = 'EnemyFactory.Event.LAST_ENEMY_DESTROYED';

EnemyFactory.prototype.setEnemies = function (enemies) {
  this._enemies = enemies;
};

EnemyFactory.prototype.setPositions = function (positions) {
  this._positions = positions;
};

EnemyFactory.prototype.update = function () {
  if (this._pauseListener.isPaused()) {
    return;
  }
  
  this._timer++;
  if (this._timer > this._interval) {
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
  if (this._noMoreEnemies() || this._enemyCountLimitReached()) {
    return;
  }
  this._timer = 0;
  this.createNextEnemy();
};

EnemyFactory.prototype.setInterval = function (interval) {
  this._interval = interval;
  this._timer = this._interval;
};

EnemyFactory.prototype.setFlashingTanks = function (tanks) {
  this._flashingTanks = tanks;
};

EnemyFactory.prototype.createNextEnemy = function () {
  var tank = this.createEnemy(this.getNextEnemy(), this.getNextPosition());
  this.nextEnemy();
  this.nextPosition();
  return tank;
};

EnemyFactory.prototype.createEnemy = function (type, position) {
  var tank = new Tank(this._eventManager);
  tank.makeEnemy();
  tank.setType(type);
  tank.setPosition(position);
  tank.setState(new TankStateAppearing(tank));
  
  if (type == Tank.Type.BASIC) {
    tank.setMoveFrequency(2);
    tank.setTrackAnimationDuration(4);
    tank.setValue(100);
  }
  else if (type == Tank.Type.FAST) {
    tank.setNormalSpeed(3);
    tank.setValue(200);
  }
  else if (type == Tank.Type.POWER) {
    tank.setBulletSpeed(Bullet.Speed.FAST);
    tank.setValue(300);
  }
  else if (type == Tank.Type.ARMOR) {
    tank.setMoveFrequency(2);
    tank.setTrackAnimationDuration(4);
    tank.setHitLimit(4);
    tank.setColorValues([[0,1],[0,2],[1,2],[0,0]]);
    tank.setValue(400);
  }
  
  if (arrayContains(this._flashingTanks, this._enemy + 1)) {
    tank.startFlashing();
  }
  
  this._eventManager.fireEvent({'name': EnemyFactory.Event.ENEMY_CREATED, 'enemy': tank});
  this._enemyCount++;
  
  return tank;
};

EnemyFactory.prototype.getNextEnemy = function () {
  return this._enemies[this._enemy];
};

EnemyFactory.prototype.nextEnemy = function () {
  this._enemy++;
};

EnemyFactory.prototype.getEnemyCount = function () {
  return this._enemyCount;
};

EnemyFactory.prototype.getEnemiesToCreateCount = function () {
  return this._enemies.length - this._enemy;
};

EnemyFactory.prototype.notify = function (event) {
  if (event.name == TankExplosion.Event.DESTROYED) {
    if (event.explosion.getTank().isEnemy()) {
      this._enemyCount--;
    }
    if (event.explosion.getTank().isEnemy() && this._enemyCount <= 0 && this.getEnemiesToCreateCount() == 0) {
      this._eventManager.fireEvent({'name': EnemyFactory.Event.LAST_ENEMY_DESTROYED});
    }
  }
};

EnemyFactory.prototype.setEnemyCountLimit = function (limit) {
  this._enemyCountLimit = limit;
};

EnemyFactory.prototype._noMoreEnemies = function () {
  return this._enemy >= this._enemies.length;
};

EnemyFactory.prototype._enemyCountLimitReached = function () {
  return this._enemyCount >= this._enemyCountLimit;
};
