function Level(eventManager) {
  Rect.call(this);
  
  this._x = 50;
  this._y = 20;
  this._w = 200;
  this._h = 150;
  
  this._painter = new Painter(eventManager);
  this._updater = new Updater(eventManager);
  
  var bounds = new Rect(this._x, this._y, this._w, this._h);
  var collisionDetector = new CollisionDetector(eventManager, bounds);

  var tank = new Tank(eventManager);
  tank.setPosition(new Point(this._x, this._y));
  tank.setNormalSpeed(2);
  tank.setBulletSize(8);
  tank.setBulletSpeed(4);

  var tankController = new TankController(eventManager, tank);
  var bulletFactory = new BulletFactory(eventManager);
  var explosionFactory = new ExplosionFactory(eventManager);

  new Wall(eventManager).setPosition(new Point(this._x + 32, this._y + 32));
  new Wall(eventManager).setPosition(new Point(this._x + 48, this._y + 32));
  new Wall(eventManager).setPosition(new Point(this._x + 64, this._y + 32));
  new Wall(eventManager).setPosition(new Point(this._x + 32, this._y + 48));
  new Wall(eventManager).setPosition(new Point(this._x + 48, this._y + 48));
}

Level.subclass(Rect);

Level.prototype.update = function () {
  this._updater.update();
};

Level.prototype.draw = function (ctx) {
  ctx.fillStyle = "black";
  ctx.fillRect(this._x, this._y, this._w, this._h);
        
  this._painter.draw(ctx);
};
