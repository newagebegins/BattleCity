function PowerUp(eventManager) {
  Sprite.call(this, eventManager);
  this._type = PowerUp.Type.GRENADE;
  this._blinkTimer = new BlinkTimer(7);
}

PowerUp.subclass(Sprite);

PowerUp.Type = {};
PowerUp.Type.GRENADE = 'grenade';
PowerUp.Type.HELMET = 'helmet';
PowerUp.Type.SHOVEL = 'shovel';
PowerUp.Type.STAR = 'star';
PowerUp.Type.TANK = 'tank';
PowerUp.Type.TIMER = 'timer';

PowerUp.prototype.setType = function (type) {
  this._type = type;
};

PowerUp.prototype.draw = function (ctx) {
  if (this._blinkTimer.isVisible()) {
    ctx.drawImage(ImageManager.getImage(this.getImage()), this._x, this._y);
  }
};

PowerUp.prototype.updateHook = function () {
  this._blinkTimer.update();
};

PowerUp.prototype.getImage = function () {
  return 'powerup_' + this._type;
};
