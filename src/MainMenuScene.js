function MainMenuScene(sceneManager) {
  this._sceneManager = sceneManager;
  this._eventManager = this._sceneManager.getEventManager();
  this._eventManager.addSubscriber(this, [Keyboard.Event.KEY_PRESSED]);
  
  this._y = Globals.CANVAS_HEIGHT;
  this._speed = 3;
  
  this._mainMenu = new MainMenu();
  this._mainMenu.setItems([
    new OnePlayerMenuItem(this._sceneManager),
    new ConstructionMenuItem(this._sceneManager)
  ]);
  
  this._mainMenuController = new MainMenuController(this._eventManager, this._mainMenu);
  this._mainMenuController.deactivate();
  
  this._cursor = new MainMenuCursor();
  this._cursorView = new MainMenuCursorView(this._cursor);
  this._mainMenuView = new MainMenuView(this._mainMenu, this._cursorView);
}

MainMenuScene.prototype.setY = function (y) {
  this._y = y;
};

MainMenuScene.prototype.getY = function () {
  return this._y;
};

MainMenuScene.prototype.setSpeed = function (speed) {
  this._speed = speed;
};

MainMenuScene.prototype.updatePosition = function () {
  if (this._y == 0) {
    this._mainMenuController.activate();
    return;
  }
  this._y -= this._speed;
  if (this._y <= 0) {
    this.arrived();
  }
};

MainMenuScene.prototype.arrived = function () {
  this._y = 0;
  this._cursor.makeVisible();
};

MainMenuScene.prototype.update = function () {
  this.updatePosition();
  this._cursor.update();
};

MainMenuScene.prototype.draw = function (ctx) {
  this._clearCanvas(ctx);
  ctx.drawImage(ImageManager.getImage('battle_city'), 56, this._y + 80);
  
  ctx.fillStyle = "#ffffff";
  
  ctx.drawImage(ImageManager.getImage('roman_one_white'), 36, this._y + 32);
  ctx.fillText("-    00", 50, this._y + 46);
  
  ctx.fillText("HI- 20000", 178, this._y + 46);
  
  ctx.drawImage(ImageManager.getImage('namcot'), 176, this._y + 352);
  
  ctx.drawImage(ImageManager.getImage('copyright'), 64, this._y + 384);
  ctx.fillText("1980 1985 NAMCO LTD.", 98, this._y + 398);
  ctx.fillText("ALL RIGHTS RESERVED", 98, this._y + 430);
  
  this._mainMenuView.draw(ctx, this._y);
};

MainMenuScene.prototype.notify = function (event) {
  if (event.name == Keyboard.Event.KEY_PRESSED) {
    this.keyPressed(event.key);
  }
};

MainMenuScene.prototype.keyPressed = function (key) {
  if (key == Keyboard.Key.START || key == Keyboard.Key.SELECT) {
    this.arrived();
  }
};

MainMenuScene.prototype.setCursor = function (cursor) {
  this._cursor = cursor;
};

MainMenuScene.prototype.setMainMenuController = function (mainMenuController) {
  this._mainMenuController = mainMenuController;
};

MainMenuScene.prototype.nextMenuItem = function () {
  this._mainMenu.nextItem();
};

MainMenuScene.prototype._clearCanvas = function (ctx) {
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};
