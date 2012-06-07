function Wall(eventManager) {
  Sprite.call(this, eventManager);
  
  this._eventManager.addSubscriber(this, [CollisionDetector.Event.COLLISION]);
  
  this._w = 16;
  this._h = 16;
}

Wall.subclass(Sprite);

Wall.prototype.notify = function (event) {
  if (event.name == CollisionDetector.Event.COLLISION && event.initiator instanceof Bullet && event.sprite === this) {
    this.destroy();
  }
};

Wall.prototype.draw = function (ctx) {
  ctx.drawImage(ImageManager.getImage('wall_brick'), this._x, this._y);
};
