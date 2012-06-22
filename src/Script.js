function Script() {
  this._nodes = [];
  this._active = true;
}

Script.prototype.enqueue = function (node) {
  this._nodes.push(node);
};

Script.prototype.update = function () {
  if (!this._active) {
    return;
  }
  while (true) {
    if (this._nodes.length == 0) {
      return;
    }
    if (this._nodes[0].update !== undefined) {
      break;
    }
    this._nodes[0].execute();
    this._nodes.shift();
  }
  
  this._nodes[0].update();
};

Script.prototype.actionCompleted = function () {
  this._nodes.shift();
};

Script.prototype.setActive = function (active) {
  this._active = active;
};
