function Construction(eventManager) {
  Gamefield.call(this, eventManager);
  
  var cursor = new Cursor(eventManager);
  cursor.setPosition(new Point(this._x, this._y));
  new CursorController(eventManager, cursor);
}

Construction.subclass(Gamefield);
