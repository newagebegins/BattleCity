function StageStatisticsScene(sceneManager, stage) {
  this._sceneManager = sceneManager;
  this._stage = stage;
  
  this._script = new Script();
  this._script.enqueue(new Delay(this._script, 100));
  this._script.enqueue({execute: function () {sceneManager.toGameOverScene();}});
};

StageStatisticsScene.prototype.update = function () {
  this._script.update();
};

StageStatisticsScene.prototype.draw = function (ctx) {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  ctx.fillStyle = "#feac4e";
  ctx.fillText("20000", 306, 32 + 14);
  
  ctx.fillStyle = "#ffffff";
  ctx.fillText("STAGE " + ("" + this._stage).lpad(" ", 2), 194, 64 + 14);
  
  ctx.drawImage(ImageManager.getImage('roman_one_red'), 52, 96);
  
  ctx.fillStyle = "#e44437";
  ctx.fillText("-PLAYER", 66, 96 + 14);
  
  ctx.fillStyle = "#feac4e";
  ctx.fillText("0", 162, 128 + 14);
  
  ctx.fillStyle = "#ffffff";
  
  ctx.fillText("PTS", 130, 176 + 14);
  ctx.drawImage(ImageManager.getImage('tank_basic_up_c0_t1'), 241, 169);
  ctx.drawImage(ImageManager.getImage('arrow'), 226, 176);
  
  ctx.fillText("PTS", 130, 224 + 14);
  ctx.drawImage(ImageManager.getImage('tank_fast_up_c0_t1'), 241, 217);
  ctx.drawImage(ImageManager.getImage('arrow'), 226, 224);
  
  ctx.fillText("PTS", 130, 272 + 14);
  ctx.drawImage(ImageManager.getImage('tank_power_up_c0_t1'), 241, 265);
  ctx.drawImage(ImageManager.getImage('arrow'), 226, 272);
  
  ctx.fillText("PTS", 130, 320 + 14);
  ctx.drawImage(ImageManager.getImage('tank_armor_up_c0_t1'), 241, 313);
  ctx.drawImage(ImageManager.getImage('arrow'), 226, 320);
  
  ctx.fillText("TOTAL", 100, 352 + 14);
  ctx.drawImage(ImageManager.getImage('white_line'), 192, 346);
};
