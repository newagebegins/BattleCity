function Level(eventManager) {
  Gamefield.call(this, eventManager);

  var tank = new Tank(eventManager);
  tank.setPosition(new Point(this._x, this._y));

  new TankController(eventManager, tank);
  new BulletFactory(eventManager);
  new ExplosionFactory(eventManager);

  new BrickWall(eventManager).setPosition(new Point(this._x + 32, this._y + 32));
  new BrickWall(eventManager).setPosition(new Point(this._x + 32, this._y + 48));
  
  new BrickWall(eventManager).setPosition(new Point(this._x + 32, this._y + 96));
  new BrickWall(eventManager).setPosition(new Point(this._x + 32, this._y + 112));
  
  new SteelWall(eventManager).setPosition(new Point(this._x + 80, this._y + 48));
  new SteelWall(eventManager).setPosition(new Point(this._x + 96, this._y + 48));
}

Level.subclass(Gamefield);
