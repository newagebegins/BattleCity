function TankView(tank) {
  this._tank = tank;
}

TankView.prototype.draw = function (ctx) {
  ctx.fillStyle = "red";
  ctx.fillRect(this._tank.getX(), this._tank.getY(), this._tank.getWidth(),
    this._tank.getHeight());
};
