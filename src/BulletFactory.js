function BulletFactory(eventManager) {
  this._eventManager = eventManager;
}

BulletFactory.prototype.notify = function (event) {
  if (event.name == Tank.Event.SHOOT) {
    this._createBullet(event.tank);
  }
};

BulletFactory.prototype._createBullet = function (tank) {
  var bullet = new Bullet(this._eventManager);
  bullet.setPosition(this._getBulletPosition(tank));
  bullet.setDimensions(tank.getBulletSize(), tank.getBulletSize());
  bullet.setDirection(tank.getDirection());
  bullet.setSpeed(tank.getBulletSpeed());
  
  this._eventManager.fireEvent({'name': Sprite.Event.CREATED, 'sprite': bullet});
};

BulletFactory.prototype._getBulletPosition = function (tank) {
  var x, y;
  var direction = tank.getDirection();
  
  if (direction == Sprite.Direction.RIGHT) {
    x = tank.getRight() + 1;
    y = tank.getTop() + tank.getHeight() / 2 - tank.getBulletSize() / 2;
  }
  else if (direction == Sprite.Direction.LEFT) {
    x = tank.getLeft() - 1;
    y = tank.getTop() + tank.getHeight() / 2 - tank.getBulletSize() / 2;
  }
  else if (direction == Sprite.Direction.UP) {
    x = tank.getLeft() + tank.getWidth() / 2 - tank.getBulletSize() / 2;
    y = tank.getTop() - 1;
  }
  else if (direction == Sprite.Direction.DOWN) {
    x = tank.getLeft() + tank.getWidth() / 2 - tank.getBulletSize() / 2;
    y = tank.getBottom() + 1;
  }
  
  return new Point(x, y);
};
