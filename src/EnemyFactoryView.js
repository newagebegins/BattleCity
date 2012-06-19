function EnemyFactoryView(enemyFactory) {
  this._enemyFactory = enemyFactory;
}

EnemyFactoryView.prototype.draw = function (ctx) {
  for (var i = 0; i < this._enemyFactory.getEnemiesToCreateCount(); ++i) {
    var x = 465 + Globals.TILE_SIZE * (i % 2);
    var y = 34 + Globals.TILE_SIZE * Math.floor(i / 2);
    ctx.drawImage(ImageManager.getImage('enemy'), x, y);
  }
};
