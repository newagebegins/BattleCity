function PlayerTankFactory(eventManager) {
  this._eventManager = eventManager;
  this._eventManager.addSubscriber(this, [TankExplosion.Event.DESTROYED]);
  this._appearPosition = new Point(0, 0);
  this._active = true;
}

PlayerTankFactory.Event = {};
PlayerTankFactory.Event.PLAYER_TANK_CREATED = 'PlayerTankFactory.Event.PLAYER_TANK_CREATED';

PlayerTankFactory.prototype.notify = function (event) {
  if (!this._active) {
    return;
  }
  if (this._tankExplosionDestroyed(event)) {
    this.create();
  }
};

PlayerTankFactory.prototype.setAppearPosition = function (position) {
  this._appearPosition = position;
};

PlayerTankFactory.prototype.create = function () {
  var tank = new Tank(this._eventManager);
  tank.setPosition(this._appearPosition);
  tank.setState(new TankStateAppearing(tank));
  this._eventManager.fireEvent({'name': PlayerTankFactory.Event.PLAYER_TANK_CREATED, 'tank': tank});
  return tank;
};

PlayerTankFactory.prototype.setActive = function (active) {
  this._active = active;
};

PlayerTankFactory.prototype._tankExplosionDestroyed = function (event) {
  if (event.name != TankExplosion.Event.DESTROYED) {
    return false;
  }
  var tank = event.explosion.getTank();
  if (!tank.isPlayer()) {
    return false;
  }
  return true;
};
