function Animation(frames) {
  this._frames = frames;
  this._frame = 0;
}

Animation.prototype.update = function () {
  this._frame++;
};

Animation.prototype.getFrame = function () {
  return this._frames[this._frame];
};

Animation.prototype.setFrames = function (frames) {
  this._frames = frames;
};

Animation.prototype.isCompleted = function () {
  return this._frame >= this._frames.length;
};
