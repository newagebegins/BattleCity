function MoveFn(object, property, endValue, duration, listener) {
  this._object = object;
  this._property = property;
  this._endValue = endValue;
  this._duration = duration;
  this._listener = listener;
  this._active = true;
  this._increment = (endValue - this._object[this._property]) / duration;
}

MoveFn.prototype.update = function () {
  if (!this._active) {
    return;
  }
  this._object[this._property] += this._increment;
  if (this._object[this._property] - this._endValue == 0) {
    this._active = false;
    this._listener.actionCompleted();
  }
};
