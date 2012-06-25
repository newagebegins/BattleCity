function Level(sceneManager, stageNumber, player) {
  Gamefield.call(this, sceneManager);
  
  var self = this;
  
  this._eventManager.addSubscriber(this, [
    BaseExplosion.Event.DESTROYED,
    Player.Event.OUT_OF_LIVES,
    EnemyFactory.Event.LAST_ENEMY_DESTROYED
  ]);
  
  this._visible = false;
  this._stage = stageNumber;
  
  new PlayerTankControllerFactory(this._eventManager);
  
  this._playerTankFactory = new PlayerTankFactory(this._eventManager);
  this._playerTankFactory.setAppearPosition(new Point(this._x + 4 * Globals.UNIT_SIZE, this._y + 12 * Globals.UNIT_SIZE));
  this._playerTankFactory.create();

  new BulletFactory(this._eventManager);
  new BulletExplosionFactory(this._eventManager);
  new TankExplosionFactory(this._eventManager);
  new BaseExplosionFactory(this._eventManager);
  new PointsFactory(this._eventManager);
  this._freezeTimer = new FreezeTimer(this._eventManager);
  
  this._aiControllersContainer = new AITankControllerContainer(this._eventManager);
  this._aiTankControllerFactory = new AITankControllerFactory(this._eventManager, this._spriteContainer);

  this._enemyFactory = new EnemyFactory(this._eventManager);
  this._enemyFactory.setPositions([
    new Point(this._x + 6 * Globals.UNIT_SIZE, this._y),
    new Point(this._x + 12 * Globals.UNIT_SIZE, this._y),
    new Point(this._x, this._y),
  ]);
  
  this._enemyFactoryView = new EnemyFactoryView(this._enemyFactory);
  
  this._createPowerUpFactory();
  
  var baseWallBuilder = new BaseWallBuilder();
  baseWallBuilder.setWallPositions([
    new Point(this._x + 11 * Globals.TILE_SIZE, this._y + 25 * Globals.TILE_SIZE),
    new Point(this._x + 11 * Globals.TILE_SIZE, this._y + 24 * Globals.TILE_SIZE),
    new Point(this._x + 11 * Globals.TILE_SIZE, this._y + 23 * Globals.TILE_SIZE),
    new Point(this._x + 12 * Globals.TILE_SIZE, this._y + 23 * Globals.TILE_SIZE),
    new Point(this._x + 13 * Globals.TILE_SIZE, this._y + 23 * Globals.TILE_SIZE),
    new Point(this._x + 14 * Globals.TILE_SIZE, this._y + 23 * Globals.TILE_SIZE),
    new Point(this._x + 14 * Globals.TILE_SIZE, this._y + 24 * Globals.TILE_SIZE),
    new Point(this._x + 14 * Globals.TILE_SIZE, this._y + 25 * Globals.TILE_SIZE),
  ]);
  baseWallBuilder.setSpriteContainer(this._spriteContainer);
  
  var powerUpHandler = new PowerUpHandler(this._eventManager);
  powerUpHandler.setSpriteContainer(this._spriteContainer);
  
  this._shovelHandler = new ShovelHandler(this._eventManager);
  this._shovelHandler.setBaseWallBuilder(baseWallBuilder);
  
  this._pause = new Pause(this._eventManager);
  
  this._player = player === undefined ? new Player() : player;
  this._player.setEventManager(this._eventManager);
  
  this._livesView = new LivesView(this._player);
  
  this._gameOverMessage = new GameOverMessage();
  
  this._gameOverScript = new Script();
  this._gameOverScript.setActive(false);
  this._gameOverScript.enqueue(new MoveFn(this._gameOverMessage, 'y', 213, 100, this._gameOverScript));
  this._gameOverScript.enqueue(new Delay(this._gameOverScript, 50));
  this._gameOverScript.enqueue({execute: function () { sceneManager.toStageStatisticsScene(stageNumber, self._player, true); }});
  
  this._levelTransitionScript = new Script();
  this._levelTransitionScript.setActive(false);
  this._levelTransitionScript.enqueue(new Delay(this._levelTransitionScript, 200));
  this._levelTransitionScript.enqueue({execute: function () { sceneManager.toStageStatisticsScene(stageNumber, self._player, false); }});
  
  this._loadStage(this._stage);
}

Level.subclass(Gamefield);

Level.prototype.update = function () {
  Gamefield.prototype.update.call(this);
  this._enemyFactory.update();
  this._aiControllersContainer.update();
  this._freezeTimer.update();
  this._shovelHandler.update();
  this._pause.update();
  this._gameOverScript.update();
  this._levelTransitionScript.update();
};

Level.prototype.draw = function (ctx) {
  if (!this._visible) {
    return;
  }
  Gamefield.prototype.draw.call(this, ctx);
  this._enemyFactoryView.draw(ctx);
  this._pause.draw(ctx);
  this._livesView.draw(ctx);
  this._drawFlag(ctx);
  this._gameOverMessage.draw(ctx);
};

Level.prototype.show = function () {
  this._visible = true;
};

Level.prototype.notify = function (event) {
  if (event.name == BaseExplosion.Event.DESTROYED) {
    this._gameOverScript.setActive(true);
    this._pause.setActive(false);
  }
  else if (event.name == Player.Event.OUT_OF_LIVES) {
    this._gameOverScript.setActive(true);
    this._pause.setActive(false);
    this._playerTankFactory.setActive(false);
  }
  else if (event.name == EnemyFactory.Event.LAST_ENEMY_DESTROYED) {
    this._levelTransitionScript.setActive(true);
  }
};

Level.prototype._loadStage = function (stageNumber) {
  var stage = Globals.stages[(stageNumber - 1) % Globals.stages.length];
  
  var serializer = new SpriteSerializer(this._eventManager);
  serializer.unserializeSprites(stage.map);
  
  this._enemyFactory.setEnemies(stage.tanks);
};

Level.prototype._createPowerUpFactory = function () {
  var powerUpFactory = new PowerUpFactory(this._eventManager);
  
  var powerUpCol1X = this._x + Globals.UNIT_SIZE + 15;
  var powerUpCol2X = this._x + 4 * Globals.UNIT_SIZE + 15;
  var powerUpCol3X = this._x + 7 * Globals.UNIT_SIZE + 15;
  var powerUpCol4X = this._x + 10 * Globals.UNIT_SIZE + 15;
  
  var powerUpRow1Y = this._y + Globals.UNIT_SIZE + 17;
  var powerUpRow2Y = this._y + 4 * Globals.UNIT_SIZE + 17;
  var powerUpRow3Y = this._y + 7 * Globals.UNIT_SIZE + 17;
  var powerUpRow4Y = this._y + 10 * Globals.UNIT_SIZE + 17;
  
  powerUpFactory.setPositions([
    new Point(powerUpCol1X, powerUpRow1Y),
    new Point(powerUpCol2X, powerUpRow1Y),
    new Point(powerUpCol3X, powerUpRow1Y),
    new Point(powerUpCol4X, powerUpRow1Y),
    
    new Point(powerUpCol1X, powerUpRow2Y),
    new Point(powerUpCol2X, powerUpRow2Y),
    new Point(powerUpCol3X, powerUpRow2Y),
    new Point(powerUpCol4X, powerUpRow2Y),
    
    new Point(powerUpCol1X, powerUpRow3Y),
    new Point(powerUpCol2X, powerUpRow3Y),
    new Point(powerUpCol3X, powerUpRow3Y),
    new Point(powerUpCol4X, powerUpRow3Y),
    
    new Point(powerUpCol1X, powerUpRow4Y),
    new Point(powerUpCol2X, powerUpRow4Y),
    new Point(powerUpCol3X, powerUpRow4Y),
    new Point(powerUpCol4X, powerUpRow4Y),
  ]);
};

Level.prototype._drawFlag = function (ctx) {
  ctx.drawImage(ImageManager.getImage('flag'), 464, 352);
  
  ctx.fillStyle = "black";
  ctx.fillText(("" + this._stage).lpad(" ", 2), 466, 398);
};
