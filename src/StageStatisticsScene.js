function StageStatisticsScene(sceneManager, stage, player, gameOver) {
  var self = this;
  
  this._sceneManager = sceneManager;
  this._stage = stage;
  this._player = player;
  this._gameOver = gameOver;
  
  this._script = new Script();
  
  this._basicTankPoints = new StageStatisticsPoints(100, this._player.getTanks(Tank.Type.BASIC), this._script);
  this._fastTankPoints = new StageStatisticsPoints(200, this._player.getTanks(Tank.Type.FAST), this._script);
  this._powerTankPoints = new StageStatisticsPoints(300, this._player.getTanks(Tank.Type.POWER), this._script);
  this._armorTankPoints = new StageStatisticsPoints(400, this._player.getTanks(Tank.Type.ARMOR), this._script);
  this._drawTotal = false;
  
  this._script.enqueue(new Delay(this._script, 30));
  this._script.enqueue({execute: function () { self._basicTankPoints.show(); }});
  this._script.enqueue(this._basicTankPoints);
  this._script.enqueue({execute: function () { self._fastTankPoints.show(); }});
  this._script.enqueue(this._fastTankPoints);
  this._script.enqueue({execute: function () { self._powerTankPoints.show(); }});
  this._script.enqueue(this._powerTankPoints);
  this._script.enqueue({execute: function () { self._armorTankPoints.show(); }});
  this._script.enqueue(this._armorTankPoints);
  this._script.enqueue({execute: function () { self._drawTotal = true; }});
  this._script.enqueue(new Delay(this._script, 60));
  this._script.enqueue({execute: function () {
    self._player.resetTanks();
    if (gameOver) {
      sceneManager.toGameOverScene();
    }
    else {
      sceneManager.toGameScene(stage + 1, player);
    }
  }});
};

StageStatisticsScene.prototype.update = function () {
  this._script.update();
};

StageStatisticsScene.prototype.draw = function (ctx) {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  ctx.fillStyle = "#feac4e";
  ctx.fillText("20000", 306, 46);
  
  ctx.fillStyle = "#ffffff";
  ctx.fillText("STAGE " + ("" + this._stage).lpad(" ", 2), 194, 78);
  
  ctx.drawImage(ImageManager.getImage('roman_one_red'), 52, 96);
  
  ctx.fillStyle = "#e44437";
  ctx.fillText("-PLAYER", 66, 110);
  
  ctx.fillStyle = "#feac4e";
  ctx.fillText(("" + this._player.getScore()).lpad(" ", 7), 66, 142);
  
  ctx.fillStyle = "#ffffff";
  
  ctx.fillText("PTS", 130, 190);
  this._basicTankPoints.draw(ctx, 34, 190);
  ctx.drawImage(ImageManager.getImage('tank_basic_up_c0_t1'), 241, 169);
  ctx.drawImage(ImageManager.getImage('arrow'), 226, 176);
  
  ctx.fillText("PTS", 130, 238);
  this._fastTankPoints.draw(ctx, 34, 238);
  ctx.drawImage(ImageManager.getImage('tank_fast_up_c0_t1'), 241, 217);
  ctx.drawImage(ImageManager.getImage('arrow'), 226, 224);
  
  ctx.fillText("PTS", 130, 286);
  this._powerTankPoints.draw(ctx, 34, 286);
  ctx.drawImage(ImageManager.getImage('tank_power_up_c0_t1'), 241, 265);
  ctx.drawImage(ImageManager.getImage('arrow'), 226, 272);
  
  ctx.fillText("PTS", 130, 334);
  this._armorTankPoints.draw(ctx, 34, 334);
  ctx.drawImage(ImageManager.getImage('tank_armor_up_c0_t1'), 241, 313);
  ctx.drawImage(ImageManager.getImage('arrow'), 226, 320);
  
  ctx.fillText("TOTAL", 100, 366);
  ctx.drawImage(ImageManager.getImage('white_line'), 192, 346);
  if (this._drawTotal) {
    ctx.fillText(("" + this._player.getTanksCount()).lpad(" ", 2), 194, 366);
  }
};
