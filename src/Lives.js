function Lives(eventManager) {
  this._eventManager = eventManager;
  this._eventManager.addSubscriber(this, [Tank.Event.PLAYER_DESTROYED]);
  this._count = 2;
}

Lives.Event = {};
Lives.Event.END = 'Lives.Event.END';

Lives.prototype.notify = function (event) {
  if (event.name == Tank.Event.PLAYER_DESTROYED) {
    this.take();
  }
};

Lives.prototype.setCount = function (count) {
  this._count = count;
};

Lives.prototype.getCount = function () {
  return this._count;
};

Lives.prototype.take = function () {
  if (this._count == 0) {
    this._eventManager.fireEvent({'name': Lives.Event.END});
    return;
  }
  this._count--;
};
