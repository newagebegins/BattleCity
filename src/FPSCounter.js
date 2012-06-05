/**
 * Wrapper around Stats.js library.
 */
function FPSCounter() {
  this._stats = new Stats();
  this._stats.setMode(0);
  this._stats.domElement.style.position = 'absolute';
  this._stats.domElement.style.right = '0px';
  this._stats.domElement.style.top = '0px';
  document.body.appendChild(this._stats.domElement);
}

FPSCounter.prototype.begin = function () {
  this._stats.begin();
};

FPSCounter.prototype.end = function () {
  this._stats.end();
};
