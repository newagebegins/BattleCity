function Delay(script, duration) {
  this._script = script;
  this._duration = duration;
  this._timer = 0;
}

Delay.prototype.update = function () {
  this._timer++;
  if (this._timer > this._duration) {
    this._script.actionCompleted();
  }
};
