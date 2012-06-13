function TankStateInvincible(tank) {
  TankStateNormal.call(this, tank);
  
  this._eventManager = this._tank.getEventManager();
  
  this._shieldFrame = 1;
  this._shieldFrameDuration = 2;
  this._shieldFrameTimer = 0;
  
  this._stateDuration = 110;
  this._stateTimer = 0;
}

TankStateInvincible.subclass(TankStateNormal);

TankStateInvincible.Event = {};
TankStateInvincible.Event.END = 'TankStateInvincible.Event.END';

TankStateInvincible.prototype.update = function () {
  TankStateNormal.prototype.update.call(this);
  this.updateShieldFrame();
  this.updateStateTimer();
};

TankStateInvincible.prototype.draw = function (ctx) {
  TankStateNormal.prototype.draw.call(this, ctx);
  ctx.drawImage(ImageManager.getImage(this.getShieldImage()), this._tank.getX(), this._tank.getY() + 1);
};

TankStateInvincible.prototype.getShieldImage = function () {
  return 'shield_' + this._shieldFrame;
};

TankStateInvincible.prototype.updateShieldFrame = function () {
  this._shieldFrameTimer++;
  if (this._shieldFrameTimer >= this._shieldFrameDuration) {
    this._shieldFrameTimer = 0;
    this._shieldFrame = this._shieldFrame == 1 ? 2 : 1;
  }
};

TankStateInvincible.prototype.updateStateTimer = function () {
  this._stateTimer++;
  if (this._stateTimer > this._stateDuration) {
    this._eventManager.fireEvent({'name': TankStateInvincible.Event.END, 'tank': this._tank});
  }
};

TankStateInvincible.prototype.setStateDuration = function (duration) {
  this._stateDuration = duration;
};

TankStateInvincible.prototype.setShieldFrameDuration = function (duration) {
  this._shieldFrameDuration = duration;
};
