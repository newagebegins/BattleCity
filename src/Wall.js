function Wall(eventManager) {
  Sprite.call(this, eventManager);
  
  this._eventManager.addSubscriber(this, [CollisionDetector.Event.COLLISION]);
}

Wall.subclass(Sprite);

Wall.prototype.notify = function (event) {
  if (event.name == CollisionDetector.Event.COLLISION && event.initiator instanceof Bullet && event.sprite === this) {
    this.destroy();
  }
};
