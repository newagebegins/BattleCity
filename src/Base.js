function Base(eventManager) {
  Sprite.call(this, eventManager);
  
  this._eventManager.addSubscriber(this, [CollisionDetector.Event.COLLISION]);
  
  this._w = Globals.UNIT_SIZE;
  this._h = Globals.UNIT_SIZE;
  
  this._hit = false;
}

Base.subclass(Sprite);

Base.Event = {};
Base.Event.HIT = 'Base.Event.HIT';

Base.prototype.getClassName = function () {
  return 'Base';
};

Base.prototype.draw = function (ctx) {
  ctx.drawImage(ImageManager.getImage(this.getImage()), this._x, this._y);
};

Base.prototype.getImage = function () {
  var image = 'base';
  if (this._hit) {
    image += '_destroyed';
  }
  return image;
};


Base.prototype.notify = function (event) {
  if (this._isHitByBullet(event)) {
    this.hit();
  }
};

Base.prototype.hit = function () {
  if (this._hit) {
    return;
  }
  this._hit = true;
  this._eventManager.fireEvent({'name': Base.Event.HIT, 'base': this});
};

Base.prototype.isHit = function () {
  return this._hit;
};

Base.prototype._isHitByBullet = function (event) {
  return event.name == CollisionDetector.Event.COLLISION &&
         event.initiator instanceof Bullet &&
         event.sprite === this
};
