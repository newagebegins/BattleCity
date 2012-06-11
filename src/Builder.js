function Builder(eventManager) {
  this._eventManager = eventManager;
  this._eventManager.addSubscriber(this, [Cursor.Event.BUILD]);
  this._structuresCount = 5;
  this._structure = 1;
  this._tileSize = 16;
}

Builder.prototype.setTileSize = function (size) {
  this._tileSize = size;
};

Builder.prototype.notify = function (event) {
  if (event.name == Cursor.Event.BUILD) {
    this.build(event.cursor);
  }
};

Builder.prototype.build = function (cursor) {
  switch (this._structure) {
    case 1:
      this.buildBrickWallRight(cursor.getPosition());
      break;
    case 2:
      this.buildBrickWallBottom(cursor.getPosition());
      break;
    case 3:
      this.buildBrickWallLeft(cursor.getPosition());
      break;
    case 4:
      this.buildBrickWallTop(cursor.getPosition());
      break;
    case 5:
      this.buildBrickWallFull(cursor.getPosition());
      break;
  }
  this._structure++;
  if (this._structure > this._structuresCount) {
    this._structure = 1;
  }
};

Builder.prototype.buildBrickWallRight = function (position) {
  var parts = [];
  
  var wallTop = new BrickWall(this._eventManager);
  wallTop.setX(position.getX() + this._tileSize);
  wallTop.setY(position.getY());
  parts.push(wallTop);
  
  var wallBottom = new BrickWall(this._eventManager);
  wallBottom.setX(position.getX() + this._tileSize);
  wallBottom.setY(position.getY() + this._tileSize);
  parts.push(wallBottom);
  
  return parts;
};

Builder.prototype.buildBrickWallBottom = function (position) {
  var parts = [];
  
  var wallLeft = new BrickWall(this._eventManager);
  wallLeft.setX(position.getX());
  wallLeft.setY(position.getY() + this._tileSize);
  parts.push(wallLeft);
  
  var wallRight = new BrickWall(this._eventManager);
  wallRight.setX(position.getX() + this._tileSize);
  wallRight.setY(position.getY() + this._tileSize);
  parts.push(wallRight);
  
  return parts;
};

Builder.prototype.buildBrickWallLeft = function (position) {
  var parts = [];
  
  var wallTop = new BrickWall(this._eventManager);
  wallTop.setX(position.getX());
  wallTop.setY(position.getY());
  parts.push(wallTop);
  
  var wallBottom = new BrickWall(this._eventManager);
  wallBottom.setX(position.getX());
  wallBottom.setY(position.getY() + this._tileSize);
  parts.push(wallBottom);
  
  return parts;
};

Builder.prototype.buildBrickWallTop = function (position) {
  var parts = [];
  
  var wallLeft = new BrickWall(this._eventManager);
  wallLeft.setX(position.getX());
  wallLeft.setY(position.getY());
  parts.push(wallLeft);
  
  var wallRight = new BrickWall(this._eventManager);
  wallRight.setX(position.getX() + this._tileSize);
  wallRight.setY(position.getY());
  parts.push(wallRight);
  
  return parts;
};

Builder.prototype.buildBrickWallFull = function (position) {
  var parts = [];
  
  var wallTopLeft = new BrickWall(this._eventManager);
  wallTopLeft.setX(position.getX());
  wallTopLeft.setY(position.getY());
  parts.push(wallTopLeft);
  
  var wallTopRight = new BrickWall(this._eventManager);
  wallTopRight.setX(position.getX() + this._tileSize);
  wallTopRight.setY(position.getY());
  parts.push(wallTopRight);
  
  var wallBottomLeft = new BrickWall(this._eventManager);
  wallBottomLeft.setX(position.getX());
  wallBottomLeft.setY(position.getY() + this._tileSize);
  parts.push(wallBottomLeft);
  
  var wallBottomRight = new BrickWall(this._eventManager);
  wallBottomRight.setX(position.getX() + this._tileSize);
  wallBottomRight.setY(position.getY() + this._tileSize);
  parts.push(wallBottomRight);
  
  return parts;
};
