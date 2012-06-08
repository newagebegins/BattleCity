function Wall(eventManager) {
  Sprite.call(this, eventManager);
  
  this._w = 16;
  this._h = 16;
}

Wall.subclass(Sprite);
