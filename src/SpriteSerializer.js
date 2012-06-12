function SpriteSerializer(eventManager) {
  this._eventManager = eventManager;
}

SpriteSerializer.SEPARATOR = ';';

SpriteSerializer.prototype.serializeSprite = function (sprite) {
  return sprite.getClassName() + '(' + sprite.getX() + ',' + sprite.getY() + ')';
};

SpriteSerializer.prototype.serializeSprites = function (sprites) {
  var result = [];
  sprites.forEach(function (sprite) {
    result.push(this.serializeSprite(sprite));
  }, this);
  return result.join(SpriteSerializer.SEPARATOR);
};

SpriteSerializer.prototype.unserializeSprites = function (text) {
  var result = [];
  var strings = text.split(SpriteSerializer.SEPARATOR);
  strings.forEach(function (str) {
    var matches = str.match(/(\w+)\((\d+),(\d+)\)/);
    var className = matches[1];
    var x = parseInt(matches[2]);
    var y = parseInt(matches[3]);
    var sprite = new window[className](this._eventManager);
    sprite.setPosition(new Point(x, y));
    result.push(sprite);
  }, this);
  return result;
};
