function StageMessage(stage) {
  this._stage = stage;
  this._visible = false;
}

StageMessage.prototype.show = function () {
  this._visible = true;
};

StageMessage.prototype.hide = function () {
  this._visible = false;
};

StageMessage.prototype.draw = function (ctx) {
  if (!this._visible) {
    return;
  }
  ctx.fillStyle = "black";
  ctx.fillText("STAGE " + ("" + this._stage).lpad(" ", 2), 195, 222);
};
