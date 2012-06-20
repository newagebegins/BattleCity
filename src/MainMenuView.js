function MainMenuView(mainMenu, cursorView) {
  this._menu = mainMenu;
  this._cursorView = cursorView;
}

MainMenuView.prototype.draw = function (ctx, baseY) {
  ctx.fillStyle = "#ffffff";
  
  var items = this._menu.getItemsInfo();
  for (var i = 0; i < items.length; ++i) {
    var y = baseY + 270 + 32 * i;
    ctx.fillText(items[i].name, 178, y);
    if (items[i].isCurrent) {
      this._cursorView.draw(ctx, 128, y - 23);
    }
  }
};
