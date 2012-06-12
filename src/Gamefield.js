function Gamefield(eventManager) {
  Rect.call(this);
  
  this._eventManager = eventManager;
  
  this._x = Globals.UNIT_SIZE;
  this._y = Globals.TILE_SIZE;
  this._w = 13 * Globals.UNIT_SIZE;
  this._h = 13 * Globals.UNIT_SIZE;
  
  this._painter = new Painter(eventManager);
  this._updater = new Updater(eventManager);
  
  var bounds = new Rect(this._x, this._y, this._w, this._h);
  new CollisionDetector(eventManager, bounds);
}

Gamefield.subclass(Rect);

Gamefield.prototype.update = function () {
  this._updater.update();
};

Gamefield.prototype.draw = function (ctx) {
  ctx.fillStyle = "black";
  ctx.fillRect(this._x, this._y, this._w, this._h);
        
  this._painter.draw(ctx);
};
