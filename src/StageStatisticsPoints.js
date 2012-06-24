function StageStatisticsPoints(value, count, listener) {
  var self = this;
  
  this._value = value;
  this._count = count;
  this._counter = count > 0 ? 1 : 0;
  this._visible = false;
  this._listener = listener;
  
  this._script = new Script();
  this._script.enqueue(new Delay(this._script, 15));
  for (var i = 1; i < this._count; ++i) {
    this._script.enqueue({execute: function () {
      self._counter++;
      SoundManager.play("statistics_1");
    }});
    this._script.enqueue(new Delay(this._script, 10));
  }
  this._script.enqueue(new Delay(this._script, 15));
  this._script.enqueue({execute: function () { self._listener.actionCompleted(); }});
}

StageStatisticsPoints.prototype.update = function () {
  this._script.update();
};

StageStatisticsPoints.prototype.draw = function (ctx, x, y) {
  if (!this._visible) {
    return;
  }
  ctx.fillStyle = "#ffffff";
  var str = ("" + this._counter * this._value).lpad(" ", 5);
  str += "     ";
  str += ("" + this._counter).lpad(" ", 2);
  ctx.fillText(str, x, y);
};

StageStatisticsPoints.prototype.show = function () {
  this._visible = true;
};
