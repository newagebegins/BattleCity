function Score(eventManager) {
  this._eventManager = eventManager;
  this._eventManager.addSubscriber(this, [PointsFactory.Event.POINTS_CREATED]);
  this._value = 0;
}

Score.prototype.notify = function (event) {
  if (event.name == PointsFactory.Event.POINTS_CREATED) {
    this.add(event.points);
  }
};

Score.prototype.getValue = function () {
  return this._value;
};

Score.prototype.add = function (points) {
  this._value += points.getValue();
};
