function Curtain(eventManager) {
  this._eventManager = eventManager;
  this._height = 10;
  this._speed = 1;
  this._position = 0;
}

Curtain.Event = {};
Curtain.Event.HAS_FALLEN = 'Curtain.Event.HAS_FALLEN';
Curtain.Event.HAS_RISEN = 'Curtain.Event.HAS_RISEN';

Curtain.prototype.setHeight = function (height) {
  this._height = height;
};

Curtain.prototype.setSpeed = function (speed) {
  this._speed = speed;
};

Curtain.prototype.getPosition = function () {
  return this._position;
};

Curtain.prototype.setPosition = function (position) {
  this._position = position;
};

Curtain.prototype.fall = function () {
  if (this._isFallen()) {
    return;
  }
  
  this._position++;
  
  if (this._isFallen()) {
    this._position = this._height;
    this._eventManager.fireEvent({'name': Curtain.Event.HAS_FALLEN});
  }
};

Curtain.prototype.rise = function () {
  if (this._isRisen()) {
    return;
  }
  
  this._position--;
  
  if (this._isRisen()) {
    this._position = 0;
    this._eventManager.fireEvent({'name': Curtain.Event.HAS_RISEN});
  }
};

Curtain.prototype._isFallen = function () {
  return this._position >= this._height;
};

Curtain.prototype._isRisen = function () {
  return this._position <= 0;
};
