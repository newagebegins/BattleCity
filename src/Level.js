function Level(eventManager) {
  Gamefield.call(this, eventManager);
  
  new PlayerTankControllerFactory(eventManager);
  
  var playerTankFactory = new PlayerTankFactory(eventManager);
  playerTankFactory.setAppearPosition(new Point(this._x + 4 * Globals.UNIT_SIZE, this._y + 12 * Globals.UNIT_SIZE));
  playerTankFactory.create();

  new BulletFactory(eventManager);
  new BulletExplosionFactory(eventManager);
  new TankExplosionFactory(eventManager);
  new PointsFactory(eventManager);
  new Score(eventManager);
  this._freezeTimer = new FreezeTimer(eventManager);
  
  this._aiControllersContainer = new AITankControllerContainer(eventManager);
  new AITankControllerFactory(eventManager);

  this._enemyFactory = new EnemyFactory(eventManager);
  this._enemyFactory.setPositions([
    new Point(this._x + 6 * Globals.UNIT_SIZE, this._y),
    new Point(this._x + 12 * Globals.UNIT_SIZE, this._y),
    new Point(this._x, this._y),
  ]);
  this._enemyFactory.setEnemies([
    {type: Tank.Type.BASIC, flashing: true},
    {type: Tank.Type.FAST},
    {type: Tank.Type.BASIC},
    {type: Tank.Type.FAST},
    {type: Tank.Type.BASIC},
    {type: Tank.Type.BASIC},
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
  
  var powerUpHandler = new PowerUpHandler(eventManager);
  powerUpHandler.setSpriteContainer(this._spriteContainer);
  
  this._shovelHandler = new ShovelHandler(eventManager);
  this._shovelHandler.setBaseWallBuilder(baseWallBuilder);
  
  this._pause = new Pause(eventManager);
  
  var map = "Base(224,400);BrickWall(208,416);BrickWall(208,400);BrickWall(208,384);BrickWall(224,384);BrickWall(240,384);BrickWall(256,384);BrickWall(256,400);BrickWall(256,416);BrickWall(64,368);BrickWall(80,368);BrickWall(64,384);BrickWall(80,384);BrickWall(64,336);BrickWall(80,336);BrickWall(64,352);BrickWall(80,352);BrickWall(64,304);BrickWall(80,304);BrickWall(64,320);BrickWall(80,320);BrickWall(128,304);BrickWall(144,304);BrickWall(128,320);BrickWall(144,320);BrickWall(128,336);BrickWall(144,336);BrickWall(128,352);BrickWall(144,352);BrickWall(128,368);BrickWall(144,368);BrickWall(128,384);BrickWall(144,384);BrickWall(192,304);BrickWall(208,304);BrickWall(192,320);BrickWall(208,320);BrickWall(192,272);BrickWall(208,272);BrickWall(192,288);BrickWall(208,288);BrickWall(224,272);BrickWall(240,272);BrickWall(224,288);BrickWall(240,288);BrickWall(256,272);BrickWall(272,272);BrickWall(256,288);BrickWall(272,288);BrickWall(256,304);BrickWall(272,304);BrickWall(256,320);BrickWall(272,320);BrickWall(320,368);BrickWall(336,368);BrickWall(320,384);BrickWall(336,384);BrickWall(320,336);BrickWall(336,336);BrickWall(320,352);BrickWall(336,352);BrickWall(320,304);BrickWall(336,304);BrickWall(320,320);BrickWall(336,320);BrickWall(384,304);BrickWall(400,304);BrickWall(384,320);BrickWall(400,320);BrickWall(384,336);BrickWall(400,336);BrickWall(384,352);BrickWall(400,352);BrickWall(384,368);BrickWall(400,368);BrickWall(384,384);BrickWall(400,384);BrickWall(192,336);BrickWall(208,336);BrickWall(256,336);BrickWall(272,336);BrickWall(128,288);BrickWall(144,288);BrickWall(64,288);BrickWall(80,288);BrickWall(320,288);BrickWall(336,288);BrickWall(384,288);BrickWall(400,288);BrickWall(256,256);BrickWall(272,256);BrickWall(192,256);BrickWall(208,256);SteelWall(32,240);SteelWall(48,240);SteelWall(416,240);SteelWall(432,240);BrickWall(352,240);BrickWall(368,240);BrickWall(320,240);BrickWall(336,240);BrickWall(96,240);BrickWall(112,240);BrickWall(128,240);BrickWall(144,240);BrickWall(32,224);BrickWall(48,224);BrickWall(96,224);BrickWall(112,224);BrickWall(128,224);BrickWall(144,224);BrickWall(320,224);BrickWall(336,224);BrickWall(352,224);BrickWall(368,224);BrickWall(416,224);BrickWall(432,224);BrickWall(192,208);BrickWall(208,208);BrickWall(256,208);BrickWall(272,208);BrickWall(256,192);BrickWall(272,192);BrickWall(192,192);BrickWall(208,192);BrickWall(128,176);BrickWall(144,176);BrickWall(64,176);BrickWall(80,176);BrickWall(320,176);BrickWall(336,176);BrickWall(384,176);BrickWall(400,176);BrickWall(256,144);BrickWall(272,144);BrickWall(192,144);BrickWall(208,144);BrickWall(128,144);BrickWall(144,144);BrickWall(128,160);BrickWall(144,160);BrickWall(64,144);BrickWall(80,144);BrickWall(64,160);BrickWall(80,160);BrickWall(64,112);BrickWall(80,112);BrickWall(64,128);BrickWall(80,128);BrickWall(64,80);BrickWall(80,80);BrickWall(64,96);BrickWall(80,96);BrickWall(64,48);BrickWall(80,48);BrickWall(64,64);BrickWall(80,64);BrickWall(128,48);BrickWall(144,48);BrickWall(128,64);BrickWall(144,64);BrickWall(128,80);BrickWall(144,80);BrickWall(128,96);BrickWall(144,96);BrickWall(128,112);BrickWall(144,112);BrickWall(128,128);BrickWall(144,128);BrickWall(192,112);BrickWall(208,112);BrickWall(192,128);BrickWall(208,128);BrickWall(192,80);BrickWall(208,80);BrickWall(192,96);BrickWall(208,96);BrickWall(192,48);BrickWall(208,48);BrickWall(192,64);BrickWall(208,64);BrickWall(256,48);BrickWall(272,48);BrickWall(256,64);BrickWall(272,64);BrickWall(256,80);BrickWall(272,80);BrickWall(256,96);BrickWall(272,96);BrickWall(256,112);BrickWall(272,112);BrickWall(256,128);BrickWall(272,128);BrickWall(320,144);BrickWall(336,144);BrickWall(320,160);BrickWall(336,160);BrickWall(320,112);BrickWall(336,112);BrickWall(320,128);BrickWall(336,128);BrickWall(320,80);BrickWall(336,80);BrickWall(320,96);BrickWall(336,96);BrickWall(320,48);BrickWall(336,48);BrickWall(320,64);BrickWall(336,64);BrickWall(384,48);BrickWall(400,48);BrickWall(384,64);BrickWall(400,64);BrickWall(384,80);BrickWall(400,80);BrickWall(384,96);BrickWall(400,96);BrickWall(384,112);BrickWall(400,112);BrickWall(384,128);BrickWall(400,128);BrickWall(384,144);BrickWall(400,144);BrickWall(384,160);BrickWall(400,160);SteelWall(224,112);SteelWall(240,112);SteelWall(224,128);SteelWall(240,128)";
  var serializer = new SpriteSerializer(eventManager);
  serializer.unserializeSprites(map);
}

Level.subclass(Gamefield);

Level.prototype.update = function () {
  Gamefield.prototype.update.call(this);
  this._enemyFactory.update();
  this._aiControllersContainer.update();
  this._freezeTimer.update();
  this._shovelHandler.update();
  this._pause.update();
};

Level.prototype.draw = function (ctx) {
  Gamefield.prototype.draw.call(this, ctx);
  this._enemyFactoryView.draw(ctx);
  this._pause.draw(ctx);
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
