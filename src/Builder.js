function Builder(eventManager) {
  this._eventManager = eventManager;
  this._eventManager.addSubscriber(this, [Cursor.Event.BUILD, Cursor.Event.MOVED]);
  
  this._structures = [
    Builder.Structure.BRICK_WALL_RIGHT,
    Builder.Structure.BRICK_WALL_BOTTOM,
    Builder.Structure.BRICK_WALL_LEFT,
    Builder.Structure.BRICK_WALL_TOP,
    Builder.Structure.BRICK_WALL_FULL,
  ];
  this._structureIndex = 0;
  this._structure = this._structures[0];
  
  this._tileSize = 16;
}

Builder.Structure = {};
Builder.Structure.BRICK_WALL_RIGHT = 'Builder.Structure.BRICK_WALL_RIGHT';
Builder.Structure.BRICK_WALL_BOTTOM = 'Builder.Structure.BRICK_WALL_BOTTOM';
Builder.Structure.BRICK_WALL_LEFT = 'Builder.Structure.BRICK_WALL_LEFT';
Builder.Structure.BRICK_WALL_TOP = 'Builder.Structure.BRICK_WALL_TOP';
Builder.Structure.BRICK_WALL_FULL = 'Builder.Structure.BRICK_WALL_FULL';

Builder.Event = {};
Builder.Event.STRUCTURE_CREATED = 'Builder.Event.STRUCTURE_CREATED';

Builder.prototype.setTileSize = function (size) {
  this._tileSize = size;
};

Builder.prototype.setStructure = function (structure) {
  this._structure = structure;
};

Builder.prototype.notify = function (event) {
  if (event.name == Cursor.Event.BUILD) {
    this.build(event.cursor);
  }
  else if (event.name == Cursor.Event.MOVED) {
    this._prevStructure();
  }
};

Builder.prototype.build = function (cursor) {
  var structure;
  if (this._structure == Builder.Structure.BRICK_WALL_RIGHT) {
    structure = this.buildBrickWallRight(cursor.getPosition());
  }
  else if (this._structure == Builder.Structure.BRICK_WALL_BOTTOM) {
    structure = this.buildBrickWallBottom(cursor.getPosition());
  }
  else if (this._structure == Builder.Structure.BRICK_WALL_LEFT) {
    structure = this.buildBrickWallLeft(cursor.getPosition());
  }
  else if (this._structure == Builder.Structure.BRICK_WALL_TOP) {
    structure = this.buildBrickWallTop(cursor.getPosition());
  }
  else if (this._structure == Builder.Structure.BRICK_WALL_FULL) {
    structure = this.buildBrickWallFull(cursor.getPosition());
  }
  this._eventManager.fireEvent({
    'name': Builder.Event.STRUCTURE_CREATED,
    'structure': structure,
    'cursor': cursor
  });
  this._nextStructure();
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

Builder.prototype._nextStructure = function () {
  this._structureIndex++;
  if (this._structureIndex >= this._structures.length) {
    this._structureIndex = 0;
  }
  this._structure = this._structures[this._structureIndex];
};

Builder.prototype._prevStructure = function () {
  this._structureIndex--;
  if (this._structureIndex < 0) {
    this._structureIndex = this._structures.length - 1;
  }
  this._structure = this._structures[this._structureIndex];
};
