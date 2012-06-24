function Animation(frames, frameDuration, loop) {
  this._frames = frames !== undefined ? frames : [];
  this._frameDuration = frameDuration !== undefined ? frameDuration : 1;
  this._loop = loop !== undefined ? loop : false;
  this._frame = 0;
  this._timer = 0;
  this._completed = false;
  this._active = true;
}

Animation.prototype.setActive = function (active) {
  this._active = active;
};

Animation.prototype.update = function () {
  if (!this._active || this._completed) {
    return;
  }
  
  this._timer++;
  if (this._timer >= this._frameDuration) {
    this._timer = 0;
    this._frame++;
    if (this._frame >= this._frames.length) {
      if (this._loop) {
        this._frame = 0;
      }
      else {
        this._frame = this._frames.length - 1;
        this._completed = true;
      }
    }
  }
};

Animation.prototype.getFrame = function () {
  return this._frames[this._frame];
};

Animation.prototype.setFrames = function (frames) {
  this._frames = frames;
};

Animation.prototype.setFrameDuration = function (duration) {
  this._frameDuration = duration;
};

Animation.prototype.isCompleted = function () {
  return this._completed;
};
