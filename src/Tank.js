function Tank(eventManager) {
  Sprite.call(this, eventManager);
  
  eventManager.addSubscriber(this,
   [Bullet.Event.DESTROYED,
    CollisionDetector.Event.COLLISION,
    CollisionDetector.Event.OUT_OF_BOUNDS]);
  
  this._w = 32;
  this._h = 32;
  
  this._bulletSize = 1;
  this._bulletSpeed = 1;
  this._trackFrame = 1;
  
  // turn smoothing sensitivity
  this._turnSmoothSens = 10;
  this._turnRoundTo = 16;
}

Tank.subclass(Sprite);

Tank.Event = {};
Tank.Event.SHOOT = 'Tank.Event.SHOOT';

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

Tank.prototype.updateHook = function () {
  this.updateTrackFrame();
};

Tank.prototype.notify = function (event) {
  if (event.name == Bullet.Event.DESTROYED && event.tank == this) {
    this._bulletShot = false;
  }
  else if (event.name == CollisionDetector.Event.COLLISION && event.initiator === this && event.sprite instanceof Wall) {
    this.resolveCollisionWithWall(event.sprite);
  }
  else if (event.name == CollisionDetector.Event.OUT_OF_BOUNDS && event.sprite === this) {
    this.resolveOutOfBounds(event.bounds);
  }
};

Tank.prototype.setTurnSmoothSens = function (sensitivity) {
  this._turnSmoothSens = sensitivity;
};

Tank.prototype.getTurnSmoothSens = function () {
  return this._turnSmoothSens;
};

Tank.prototype.setTurnRoundTo = function (value) {
  this._turnRoundTo = value;
};

Tank.prototype.getTurnRoundTo = function () {
  return this._turnRoundTo;
};

Tank.prototype.move = function () {
  if (this._turn) {
    this._smoothTurn();
  }
  Sprite.prototype.move.call(this);
};

Tank.prototype._smoothTurn = function () {
  var val;
  
  if (this._direction == Sprite.Direction.UP || this._direction == Sprite.Direction.DOWN) {
    if (this._prevDirection == Sprite.Direction.RIGHT) {
      val = this._turnRoundTo - (this._x % this._turnRoundTo);
      if (val < this._turnSmoothSens) {
        this._x += val;
      }
    }
    else if (this._prevDirection == Sprite.Direction.LEFT) {
      val = this._x % this._turnRoundTo;
      if (val < this._turnSmoothSens) {
        this._x -= val;
      }
    }
  }
  else {
    if (this._prevDirection == Sprite.Direction.DOWN) {
      val = this._turnRoundTo - (this._y % this._turnRoundTo);
      if (val < this._turnSmoothSens) {
        this._y += val;
      }
    }
    else if (this._prevDirection == Sprite.Direction.UP) {
      val = this._y % this._turnRoundTo;
      if (val < this._turnSmoothSens) {
        this._y -= val;
      }
    }
  }
};

Tank.prototype.draw = function (ctx) {
  ctx.drawImage(ImageManager.getImage(this.getImage()), this._x, this._y);
};

Tank.prototype.resolveCollisionWithWall = function (wall) {
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
