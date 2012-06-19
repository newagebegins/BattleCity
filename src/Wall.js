function Wall(eventManager) {
  Sprite.call(this, eventManager);
  
  this._eventManager.addSubscriber(this, [CollisionDetector.Event.COLLISION]);
  
  this._hitLeft = false;
  this._hitRight = false;
  this._hitTop = false;
  this._hitBottom = false;
  
  this._w = Globals.TILE_SIZE;
  this._h = Globals.TILE_SIZE;
  
  this._invincibleForNormalBullets = false;
}

Wall.subclass(Sprite);

Wall.prototype.notify = function (event) {
  if (event.name == CollisionDetector.Event.COLLISION && event.initiator instanceof Bullet && event.sprite === this) {
    this.hitByBullet(event.initiator);
  }
};

Wall.prototype.hitByBullet = function (bullet) {
  if (bullet.getType() == Bullet.Type.ENHANCED) {
    this.destroy();
    return;
  }
  
  if (this.isInvincibleForNormalBullets()) {
    return;
  }
  
  if (bullet.getDirection() == Sprite.Direction.RIGHT) {
    this.hitLeft();
  }
  else if (bullet.getDirection() == Sprite.Direction.LEFT) {
    this.hitRight();
  }
  else if (bullet.getDirection() == Sprite.Direction.DOWN) {
    this.hitTop();
  }
  else if (bullet.getDirection() == Sprite.Direction.UP) {
    this.hitBottom();
  }
};

Wall.prototype.hitLeft = function () {
  if (this._hitLeft || this._hitRight) {
    this.destroy();
    return;
  }
  this._hitLeft = true;
};

Wall.prototype.isHitLeft = function () {
  return this._hitLeft;
};

Wall.prototype.hitRight = function () {
  if (this._hitRight || this._hitLeft) {
    this.destroy();
    return;
  }
  this._hitRight = true;
};

Wall.prototype.isHitRight = function () {
  return this._hitRight;
};

Wall.prototype.hitTop = function () {
  if (this._hitTop || this._hitBottom) {
    this.destroy();
    return;
  }
  this._hitTop = true;
};


Wall.prototype.isHitTop = function () {
  return this._hitTop;
};

Wall.prototype.hitBottom = function () {
  if (this._hitBottom || this._hitTop) {
    this.destroy();
    return;
  }
  this._hitBottom = true;
};

Wall.prototype.isHitBottom = function () {
  return this._hitBottom;
};

Wall.prototype.draw = function (ctx) {
  ctx.drawImage(ImageManager.getImage(this.getImage()), this._x, this._y);
  this._hideDestroyedAreas(ctx);
};

Wall.prototype.makeInvincibleForNormalBullets = function () {
  this._invincibleForNormalBullets = true;
};

Wall.prototype.isInvincibleForNormalBullets = function () {
  return this._invincibleForNormalBullets;
};

Wall.prototype._hideDestroyedAreas = function (ctx) {
  ctx.fillStyle = "black";
  
  if (this._hitTop) {
    ctx.fillRect(this._x, this._y, this._w, this._h / 2);
  }
  if (this._hitBottom) {
    ctx.fillRect(this._x, this._y + this._h / 2, this._w, this._h / 2);
  }
  if (this._hitLeft) {
    ctx.fillRect(this._x, this._y, this._w / 2, this._h);
  }
  if (this._hitRight) {
    ctx.fillRect(this._x + this._w / 2, this._y, this._w / 2, this._h);
  }
};
