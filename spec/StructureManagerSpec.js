describe("StructureManager", function () {
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var structureManager = new StructureManager(eventManager);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(structureManager,
      [Builder.Event.STRUCTURE_CREATED, Sprite.Event.DESTROYED]);
  });
  
  describe("#notify", function () {
    it('Builder.Event.STRUCTURE_CREATED', function () {
      var eventManager = new EventManager();
      var structureManager = new StructureManager(eventManager);
      spyOn(structureManager, 'destroySpritesUnderCursor');
      spyOn(structureManager, 'addStructure');
      var structure = [new BrickWall(eventManager), new BrickWall(eventManager)];
      var cursor = new Cursor(eventManager);
      structureManager.notify({
        'name': Builder.Event.STRUCTURE_CREATED,
        'structure': structure,
        'cursor': cursor
      });
      expect(structureManager.destroySpritesUnderCursor).toHaveBeenCalledWith(cursor);
      expect(structureManager.addStructure).toHaveBeenCalledWith(structure);
    });
    
    it('Sprite.Event.DESTROYED', function () {
      var eventManager = new EventManager();
      var structureManager = new StructureManager(eventManager);
      spyOn(structureManager, 'removeSprite');
      var wall = new BrickWall(eventManager);
      structureManager.notify({
        'name': Sprite.Event.DESTROYED,
        'sprite': wall
      });
      expect(structureManager.removeSprite).toHaveBeenCalledWith(wall);
    });
  });
  
  it("#destroySpritesUnderCursor", function () {
    var eventManager = new EventManager();
    var cursor = new Cursor(eventManager);
    cursor.setRect(new Rect(2, 3, 8, 8));
    var structureManager = new StructureManager(eventManager);
    
    var wallOne = new BrickWall(eventManager);
    wallOne.setRect(new Rect(2, 3, 4, 4));
    spyOn(wallOne, 'destroy');
    
    var wallTwo = new BrickWall(eventManager);
    wallTwo.setRect(new Rect(6, 3, 4, 4));
    spyOn(wallTwo, 'destroy');
    
    var wallThree = new BrickWall(eventManager);
    wallThree.setRect(new Rect(10, 3, 4, 4));
    spyOn(wallThree, 'destroy');
    
    var wallFour = new BrickWall(eventManager);
    wallFour.setRect(new Rect(10, 7, 4, 4));
    spyOn(wallFour, 'destroy');
    
    var structureOne = [wallOne, wallTwo];
    var structureTwo = [wallThree, wallFour];
    
    structureManager.addStructure(structureOne);
    structureManager.addStructure(structureTwo);
    
    structureManager.destroySpritesUnderCursor(cursor);
    
    expect(wallOne.destroy).toHaveBeenCalled();
    expect(wallTwo.destroy).toHaveBeenCalled();
    expect(wallThree.destroy).not.toHaveBeenCalled();
    expect(wallFour.destroy).not.toHaveBeenCalled();
  });
  
  it("#addStructure", function () {
    var eventManager = new EventManager();
    var structureManager = new StructureManager(eventManager);
    var wallOne = new BrickWall(eventManager);
    var wallTwo = new BrickWall(eventManager);
    
    expect(structureManager.containsSprite(wallOne)).toBeFalsy();
    expect(structureManager.containsSprite(wallTwo)).toBeFalsy();
    
    structureManager.addStructure([wallOne, wallTwo]);
    
    expect(structureManager.containsSprite(wallOne)).toBeTruthy();
    expect(structureManager.containsSprite(wallTwo)).toBeTruthy();
  });
  
  it("#removeSprite", function () {
    var eventManager = new EventManager();
    var structureManager = new StructureManager(eventManager);
    var wallOne = new BrickWall(eventManager);
    var wallTwo = new BrickWall(eventManager);
    
    structureManager.addStructure([wallOne, wallTwo]);
    
    expect(structureManager.containsSprite(wallOne)).toBeTruthy();
    expect(structureManager.containsSprite(wallTwo)).toBeTruthy();
    
    structureManager.removeSprite(wallTwo);
    
    expect(structureManager.containsSprite(wallOne)).toBeTruthy();
    expect(structureManager.containsSprite(wallTwo)).toBeFalsy();
  });
});
