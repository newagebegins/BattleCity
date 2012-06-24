function GameScene(sceneManager, stage, player) {
  var self = this;
  this._sceneManager = sceneManager;
  this._curtain = new Curtain();
  this._stage = stage === undefined ? 1 : stage;
  this._stageMessage = new StageMessage(this._stage);
  this._level = new Level(sceneManager, this._stage, player);
  
  this._script = new Script();
  this._script.enqueue({update: function () {
    self._curtain.fall();
    if (self._curtain.isFallen()) {
      self._script.actionCompleted();
    }
  }});
  this._script.enqueue({execute: function () {
    self._stageMessage.show();
    SoundManager.play("stage_start");
  }});
  this._script.enqueue(new Delay(this._script, 60));
  this._script.enqueue({execute: function () {
    self._stageMessage.hide();
    self._level.show();
  }});
  this._script.enqueue({update: function () {
    self._curtain.rise();
    if (self._curtain.isRisen()) {
      self._script.actionCompleted();
    }
  }});
  this._script.enqueue(this._level);
}

GameScene.prototype.update = function () {
  this._script.update();
};

GameScene.prototype.draw = function (ctx) {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  this._level.draw(ctx);
  this._curtain.draw(ctx);
  this._stageMessage.draw(ctx);
};
