function Cursor(eventManager) {
  Sprite.call(this, eventManager);
  
  eventManager.addSubscriber(this, [CollisionDetector.Event.OUT_OF_BOUNDS]);
  
  this._w = Globals.UNIT_SIZE;
  this._h = Globals.UNIT_SIZE;
  this._normalSpeed = Globals.UNIT_SIZE;
  this._blinkTimer = new BlinkTimer(12);
  
  this._moveDelay = 20;
  this._moveTimer = 0;
  this._moved = false;
}

Cursor.subclass(Sprite);

Cursor.Event = {};
Cursor.Event.BUILD = 'Cursor.Event.BUILD';
Cursor.Event.MOVED = 'Cursor.Event.MOVED';

Cursor.prototype.toNormalSpeed = function () {
  Sprite.prototype.toNormalSpeed.call(this);
  this._moved = false;
};

Cursor.prototype.setMoveDelay = function (delay) {
  this._moveDelay = delay;
};

Cursor.prototype.build = function () {
  this._eventManager.fireEvent({'name': Cursor.Event.BUILD, 'cursor': this});
};

Cursor.prototype.notify = function (event) {
  if (event.name == CollisionDetector.Event.OUT_OF_BOUNDS && event.sprite === this) {
    this.resolveOutOfBounds(event.bounds);
  }
};

Cursor.prototype.move = function () {
  if (this._moved) {
    this._moveTimer++;
    if (this._moveTimer <= this._moveDelay) {
      return;
    }
  }
  Sprite.prototype.move.call(this);
  this._moveTimer = 0;
  this._moved = true;
};

Cursor.prototype.moveHook = function () {
  this._eventManager.fireEvent({'name': Cursor.Event.MOVED, 'cursor': this});
};

Cursor.prototype.updateHook = function () {
  this._blinkTimer.update();
};

Cursor.prototype.draw = function (ctx) {
  if (this._blinkTimer.isVisible()) {
    ctx.drawImage(ImageManager.getImage('tank_player1_up_c0_t1'), this._x, this._y);
  }
};
