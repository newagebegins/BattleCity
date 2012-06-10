function BlinkTimer(duration) {
  this._duration = duration;
  this._timer = 0;
  this._visible = true;
}

BlinkTimer.prototype.update = function () {
  this._timer++;
  if (this._timer == this._duration) {
    this._timer = 0;
    this._visible = !this._visible;
  }
};

BlinkTimer.prototype.setDuration = function (duration) {
  this._duration = duration;
};

BlinkTimer.prototype.isVisible = function () {
  return this._visible;
};
