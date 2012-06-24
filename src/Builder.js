function Builder(eventManager) {
  this._eventManager = eventManager;
  this._eventManager.addSubscriber(this, [Cursor.Event.BUILD, Cursor.Event.MOVED]);
  
  this._structures = [
    Builder.Structure.BRICK_WALL_RIGHT,
    Builder.Structure.BRICK_WALL_BOTTOM,
    Builder.Structure.BRICK_WALL_LEFT,
    Builder.Structure.BRICK_WALL_TOP,
    Builder.Structure.BRICK_WALL_FULL,
    
    Builder.Structure.STEEL_WALL_RIGHT,
    Builder.Structure.STEEL_WALL_BOTTOM,
    Builder.Structure.STEEL_WALL_LEFT,
    Builder.Structure.STEEL_WALL_TOP,
    Builder.Structure.STEEL_WALL_FULL,
    
    Builder.Structure.WATER,
    Builder.Structure.TREES,
    
    Builder.Structure.CLEAR,
  ];
  this._structureIndex = 0;
  this._prevStructureIndex = 0;
  this._structure = this._structures[0];
  
  this._tileSize = Globals.TILE_SIZE;
}

Builder.Structure = {};
Builder.Structure.BRICK_WALL_RIGHT = 'Builder.Structure.BRICK_WALL_RIGHT';
Builder.Structure.BRICK_WALL_BOTTOM = 'Builder.Structure.BRICK_WALL_BOTTOM';
Builder.Structure.BRICK_WALL_LEFT = 'Builder.Structure.BRICK_WALL_LEFT';
Builder.Structure.BRICK_WALL_TOP = 'Builder.Structure.BRICK_WALL_TOP';
Builder.Structure.BRICK_WALL_FULL = 'Builder.Structure.BRICK_WALL_FULL';

Builder.Structure.STEEL_WALL_RIGHT = 'Builder.Structure.STEEL_WALL_RIGHT';
Builder.Structure.STEEL_WALL_BOTTOM = 'Builder.Structure.STEEL_WALL_BOTTOM';
Builder.Structure.STEEL_WALL_LEFT = 'Builder.Structure.STEEL_WALL_LEFT';
Builder.Structure.STEEL_WALL_TOP = 'Builder.Structure.STEEL_WALL_TOP';
Builder.Structure.STEEL_WALL_FULL = 'Builder.Structure.STEEL_WALL_FULL';

Builder.Structure.WATER = 'Builder.Structure.WATER';
Builder.Structure.TREES = 'Builder.Structure.TREES';

Builder.Structure.CLEAR = 'Builder.Structure.CLEAR';

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
  else if (this._structure == Builder.Structure.STEEL_WALL_RIGHT) {
    structure = this.buildSteelWallRight(cursor.getPosition());
  }
  else if (this._structure == Builder.Structure.STEEL_WALL_BOTTOM) {
    structure = this.buildSteelWallBottom(cursor.getPosition());
  }
  else if (this._structure == Builder.Structure.STEEL_WALL_LEFT) {
    structure = this.buildSteelWallLeft(cursor.getPosition());
  }
  else if (this._structure == Builder.Structure.STEEL_WALL_TOP) {
    structure = this.buildSteelWallTop(cursor.getPosition());
  }
  else if (this._structure == Builder.Structure.STEEL_WALL_FULL) {
    structure = this.buildSteelWallFull(cursor.getPosition());
  }
  else if (this._structure == Builder.Structure.WATER) {
    structure = this.buildWater(cursor.getPosition());
  }
  else if (this._structure == Builder.Structure.TREES) {
    structure = this.buildTrees(cursor.getPosition());
  }
  else if (this._structure == Builder.Structure.CLEAR) {
    structure = this.clear(cursor.getPosition());
  }
  this._eventManager.fireEvent({
    'name': Builder.Event.STRUCTURE_CREATED,
    'structure': structure,
    'cursor': cursor
  });
  this._nextStructure();
};

Builder.prototype.buildBrickWallRight = function (position) {
  return this._buildWallRight(position, new BrickWallFactory(this._eventManager));
};

Builder.prototype.buildBrickWallBottom = function (position) {
  return this._buildWallBottom(position, new BrickWallFactory(this._eventManager));
};

Builder.prototype.buildBrickWallLeft = function (position) {
  return this._buildWallLeft(position, new BrickWallFactory(this._eventManager));
};

Builder.prototype.buildBrickWallTop = function (position) {
  return this._buildWallTop(position, new BrickWallFactory(this._eventManager));
};

Builder.prototype.buildBrickWallFull = function (position) {
  return this._buildWallFull(position, new BrickWallFactory(this._eventManager));
};

Builder.prototype.buildSteelWallRight = function (position) {
  return this._buildWallRight(position, new SteelWallFactory(this._eventManager));
};

Builder.prototype.buildSteelWallBottom = function (position) {
  return this._buildWallBottom(position, new SteelWallFactory(this._eventManager));
};

Builder.prototype.buildSteelWallLeft = function (position) {
  return this._buildWallLeft(position, new SteelWallFactory(this._eventManager));
};

Builder.prototype.buildSteelWallTop = function (position) {
  return this._buildWallTop(position, new SteelWallFactory(this._eventManager));
};

Builder.prototype.buildSteelWallFull = function (position) {
  return this._buildWallFull(position, new SteelWallFactory(this._eventManager));
};

Builder.prototype.buildWater = function (position) {
  var parts = [];
  var water = new Water(this._eventManager);
  water.setPosition(position);
  water.stopAnimation();
  parts.push(water);
  return parts;
};

Builder.prototype.buildTrees = function (position) {
  var parts = [];
  var trees = new Trees(this._eventManager);
  trees.setPosition(position);
  parts.push(trees);
  return parts;
};

Builder.prototype.clear = function (position) {
  return [];
};

Builder.prototype._buildWallRight = function (position, factory) {
  var parts = [];
  
  var wallTop = factory.create();
  wallTop.setX(position.getX() + this._tileSize);
  wallTop.setY(position.getY());
  parts.push(wallTop);
  
  var wallBottom = factory.create();
  wallBottom.setX(position.getX() + this._tileSize);
  wallBottom.setY(position.getY() + this._tileSize);
  parts.push(wallBottom);
  
  return parts;
};

Builder.prototype._buildWallBottom = function (position, factory) {
  var parts = [];
  
  var wallLeft = factory.create();
  wallLeft.setX(position.getX());
  wallLeft.setY(position.getY() + this._tileSize);
  parts.push(wallLeft);
  
  var wallRight = factory.create();
  wallRight.setX(position.getX() + this._tileSize);
  wallRight.setY(position.getY() + this._tileSize);
  parts.push(wallRight);
  
  return parts;
};

Builder.prototype._buildWallLeft = function (position, factory) {
  var parts = [];
  
  var wallTop = factory.create();
  wallTop.setX(position.getX());
  wallTop.setY(position.getY());
  parts.push(wallTop);
  
  var wallBottom = factory.create();
  wallBottom.setX(position.getX());
  wallBottom.setY(position.getY() + this._tileSize);
  parts.push(wallBottom);
  
  return parts;
};

Builder.prototype._buildWallTop = function (position, factory) {
  var parts = [];
  
  var wallLeft = factory.create();
  wallLeft.setX(position.getX());
  wallLeft.setY(position.getY());
  parts.push(wallLeft);
  
  var wallRight = factory.create();
  wallRight.setX(position.getX() + this._tileSize);
  wallRight.setY(position.getY());
  parts.push(wallRight);
  
  return parts;
};

Builder.prototype._buildWallFull = function (position, factory) {
  var parts = [];
  
  var wallTopLeft = factory.create();
  wallTopLeft.setX(position.getX());
  wallTopLeft.setY(position.getY());
  parts.push(wallTopLeft);
  
  var wallTopRight = factory.create();
  wallTopRight.setX(position.getX() + this._tileSize);
  wallTopRight.setY(position.getY());
  parts.push(wallTopRight);
  
  var wallBottomLeft = factory.create();
  wallBottomLeft.setX(position.getX());
  wallBottomLeft.setY(position.getY() + this._tileSize);
  parts.push(wallBottomLeft);
  
  var wallBottomRight = factory.create();
  wallBottomRight.setX(position.getX() + this._tileSize);
  wallBottomRight.setY(position.getY() + this._tileSize);
  parts.push(wallBottomRight);
  
  return parts;
};

Builder.prototype._nextStructure = function () {
  this._prevStructureIndex = this._structureIndex;
  this._structureIndex++;
  if (this._structureIndex >= this._structures.length) {
    this._structureIndex = 0;
  }
  this._structure = this._structures[this._structureIndex];
};

Builder.prototype._prevStructure = function () {
  this._structureIndex = this._prevStructureIndex;
  this._structure = this._structures[this._structureIndex];
};
