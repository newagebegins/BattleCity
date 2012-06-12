function Level(eventManager) {
  Gamefield.call(this, eventManager);

  var tank = new Tank(eventManager);
  tank.setPosition(new Point(this._x, this._y));

  new TankController(eventManager, tank);
  new BulletFactory(eventManager);
  new ExplosionFactory(eventManager);

  var map = "Base(224,400);BrickWall(208,416);BrickWall(208,400);BrickWall(208,384);BrickWall(224,384);BrickWall(240,384);BrickWall(256,384);BrickWall(256,400);BrickWall(256,416);SteelWall(64,16);SteelWall(80,16);SteelWall(64,32);SteelWall(80,32);SteelWall(64,48);SteelWall(80,48);SteelWall(64,64);SteelWall(80,64);SteelWall(64,80);SteelWall(80,80);SteelWall(64,96);SteelWall(80,96);SteelWall(64,112);SteelWall(80,112);SteelWall(64,128);SteelWall(80,128);SteelWall(96,112);SteelWall(112,112);SteelWall(96,128);SteelWall(112,128);SteelWall(128,112);SteelWall(144,112);SteelWall(128,128);SteelWall(144,128);SteelWall(160,112);SteelWall(176,112);SteelWall(160,128);SteelWall(176,128)";
  var serializer = new SpriteSerializer(eventManager);
  serializer.unserializeSprites(map);
}

Level.subclass(Gamefield);
