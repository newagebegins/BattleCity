function SpriteSerializerController(eventManager, structureManager) {
  this._eventManager = eventManager;
  this._eventManager.addSubscriber(this, [Keyboard.Event.KEY_RELEASED]);
  this._structureManager = structureManager;
  this._spriteSerializer = new SpriteSerializer(this._eventManager);
  this._createTextArea();
}

SpriteSerializerController.prototype._createTextArea = function () {
  this._textarea = $('<textarea />');
  this._textarea.css('width', Globals.CANVAS_WIDTH - 6);
  this._div = $('<div id="serialize" />');
  this._div.append(this._textarea);
  $('#main').prepend(this._div);
};

SpriteSerializerController.prototype.destroy = function () {
  $('#serialize').remove();
};

SpriteSerializerController.prototype.notify = function (event) {
  if (event.name == Keyboard.Event.KEY_RELEASED) {
    this.keyReleased(event.key);
  }
};

SpriteSerializerController.prototype.keyReleased = function (key) {
  if (key == Keyboard.Key.S) {
    this._output();
  }
};

SpriteSerializerController.prototype._output = function () {
  var sprites = this._structureManager.getSprites();
  var str = this._spriteSerializer.serializeSprites(sprites);
  this._textarea.text(str);
};
