function Construction(eventManager) {
  Gamefield.call(this, eventManager);
  
  new Builder(eventManager);
  new StructureManager(eventManager);
  
  var cursor = new Cursor(eventManager);
  cursor.setZIndex(100);
  cursor.setPosition(new Point(this._x, this._y));
  new CursorController(eventManager, cursor);
}

Construction.subclass(Gamefield);
