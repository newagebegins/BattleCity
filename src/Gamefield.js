function Gamefield(eventManager) {
  Rect.call(this);
  
  this._x = 32;
  this._y = 16;
  this._w = 416; // 13 tiles * 32 px
  this._h = 416;
  
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
