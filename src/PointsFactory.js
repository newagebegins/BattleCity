function PointsFactory(eventManager) {
  this._eventManager = eventManager;
  this._eventManager.addSubscriber(this, [TankExplosion.Event.DESTROYED]);
  this._pointsSize = Globals.UNIT_SIZE;
}

PointsFactory.Event = {};
PointsFactory.Event.POINTS_CREATED = 'PointsFactory.Event.POINTS_CREATED';

PointsFactory.prototype.notify = function (event) {
  if (this._enemyTankExplosionEnd(event)) {
    this.create(event.explosion);
  }
};

PointsFactory.prototype.create = function (explosion) {
  var tank = explosion.getTank();
  var points = new Points(this._eventManager);
  points.setValue(tank.getValue());
  var explosionCenter = explosion.getCenter();
  points.setRect(new Rect(
    explosionCenter.getX() - this._pointsSize / 2,
    explosionCenter.getY() - this._pointsSize / 2,
    this._pointsSize,
    this._pointsSize));
  this._eventManager.fireEvent({'name': PointsFactory.Event.POINTS_CREATED, 'points': points});
  return points;
};

PointsFactory.prototype.setPointsSize = function (size) {
  this._pointsSize = size;
};

PointsFactory.prototype._enemyTankExplosionEnd = function (event) {
  if (event.name != TankExplosion.Event.DESTROYED) {
    return false;
  }
  var tank = event.explosion.getTank();
  if (!tank.isEnemy()) {
    return false;
  }
  if (tank.getValue() <= 0) {
    return false;
  }
  return true;
};
