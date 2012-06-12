function Wall(eventManager) {
  Sprite.call(this, eventManager);
  
  this._w = Globals.TILE_SIZE;
  this._h = Globals.TILE_SIZE;
}

Wall.subclass(Sprite);
