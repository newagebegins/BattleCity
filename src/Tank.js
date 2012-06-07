function Tank(eventManager) {
  Sprite.call(this, eventManager);
  
  eventManager.addSubscriber(this, [Bullet.Event.DESTROYED, CollisionDetector.Event.COLLISION]);
  
  this._normalSpeed = 0;
  this._bulletSize = 1;
  this._bulletSpeed = 1;
  this._trackFrame = 1;
}

Tank.subclass(Sprite);

Tank.Event = {};
Tank.Event.SHOOT = 'Tank.Event.SHOOT';

Tank.prototype.getNormalSpeed = function () {
  return this._normalSpeed;
};

Tank.prototype.setNormalSpeed = function (speed) {
  this._normalSpeed = speed;
};

Tank.prototype.toNormalSpeed = function () {
  this._speed = this._normalSpeed;
};

Tank.prototype.setBulletSize = function (size) {
  this._bulletSize = size;
};
  
Tank.prototype.getBulletSize = function () {
  return this._bulletSize;
};
  
Tank.prototype.setBulletSpeed = function (speed) {
  this._bulletSpeed = speed;
};

Tank.prototype.getBulletSpeed = function () {
  return this._bulletSpeed;
};
  
Tank.prototype.shoot = function () {
  if (this._bulletShot) {
    return;
  }
  this._bulletShot = true;
  this._eventManager.fireEvent({'name': Tank.Event.SHOOT, 'tank': this});
};
  
Tank.prototype.setTrackFrame = function (frame) {
  this._trackFrame = frame;
};
  
Tank.prototype.getTrackFrame = function () {
  return this._trackFrame;
};

Tank.prototype.updateTrackFrame = function () {
  if (this._speed == 0) {
    return;
  }
  this._trackFrame = this._trackFrame == 1 ? 2 : 1;
};

Tank.prototype.getImage = function () {
  return 'tank_' + this._direction + '_' + this._trackFrame;
};

Tank.prototype.update = function () {
  Sprite.prototype.update.call(this);
  this.updateTrackFrame();
};

Tank.prototype.notify = function (event) {
  if (event.name == Bullet.Event.DESTROYED && event.tank == this) {
    this._bulletShot = false;
  }
  else if (event.name == CollisionDetector.Event.COLLISION && event.initiator === this && event.sprite instanceof Wall) {
    this._resolveCollisionWithWall(event.sprite);
  }
};

Tank.prototype.draw = function (ctx) {
  ctx.drawImage(ImageManager.getImage(this.getImage()), this._x, this._y);
};

Tank.prototype._resolveCollisionWithWall = function (wall) {
  var moveX = 0;
  var moveY = 0;
  if (this._direction == Sprite.Direction.RIGHT) {
    moveX = this.getRight() - wall.getLeft() + 1;
  }
  else if (this._direction == Sprite.Direction.LEFT) {
    moveX = this.getLeft() - wall.getRight() - 1;
  }
  else if (this._direction == Sprite.Direction.UP) {
    moveY = this.getTop() - wall.getBottom() - 1;
  }
  else if (this._direction == Sprite.Direction.DOWN) {
    moveY = this.getBottom() - wall.getTop() + 1;
  }
  this._x -= moveX;
  this._y -= moveY;
};
