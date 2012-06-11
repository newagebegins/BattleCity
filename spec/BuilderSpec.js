describe("Builder", function () {
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var builder = new Builder(eventManager);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(builder, [Cursor.Event.BUILD]);
  });
  
  describe("#notify", function () {
    it("build", function () {
      var eventManager = new EventManager();
      var builder = new Builder(eventManager);
      spyOn(builder, 'build');
      var cursor = new Cursor(eventManager);
      builder.notify({'name': Cursor.Event.BUILD, 'cursor': cursor});
      expect(builder.build).toHaveBeenCalledWith(cursor);
    });
  });
  
  describe("#build", function () {
    var eventManager, builder, cursor;
    
    beforeEach(function () {
      eventManager = new EventManager();
      builder = new Builder(eventManager);
      cursor = new Cursor(eventManager);
    });
    
    it("should call appropriate build function", function () {
      spyOn(builder, 'buildBrickWallRight');
      spyOn(builder, 'buildBrickWallBottom');
      spyOn(builder, 'buildBrickWallLeft');
      spyOn(builder, 'buildBrickWallTop');
      spyOn(builder, 'buildBrickWallFull');
      
      builder.build(cursor);
      expect(builder.buildBrickWallRight).toHaveBeenCalledWith(cursor.getPosition());
      builder.buildBrickWallRight.reset();
      
      builder.build(cursor);
      expect(builder.buildBrickWallBottom).toHaveBeenCalledWith(cursor.getPosition());
      builder.buildBrickWallBottom.reset();
      
      builder.build(cursor);
      expect(builder.buildBrickWallLeft).toHaveBeenCalledWith(cursor.getPosition());
      builder.buildBrickWallLeft.reset();
      
      builder.build(cursor);
      expect(builder.buildBrickWallTop).toHaveBeenCalledWith(cursor.getPosition());
      builder.buildBrickWallTop.reset();
      
      builder.build(cursor);
      expect(builder.buildBrickWallFull).toHaveBeenCalledWith(cursor.getPosition());
      builder.buildBrickWallFull.reset();
      
      builder.build(cursor);
      expect(builder.buildBrickWallRight).toHaveBeenCalledWith(cursor.getPosition());
      builder.buildBrickWallRight.reset();
    });
    
    it("should fire event", function () {
      spyOn(eventManager, 'fireEvent');
      builder.setStructure(Builder.Structure.BRICK_WALL_RIGHT);
      builder.build(cursor);
      expect(eventManager.fireEvent).toHaveBeenCalledWith({
        'name': Builder.Event.STRUCTURE_CREATED,
        'structure': builder.buildBrickWallRight(cursor.getPosition())
      });
    });
  });
  
  describe("build functions", function () {
    var eventManager, builder;
    
    beforeEach(function () {
      eventManager = new EventManager();
      builder = new Builder(eventManager);
      builder.setTileSize(4);
    });
    
    it("#buildBrickWallRight", function () {
      var parts = builder.buildBrickWallRight(new Point(2, 3));
      expect(parts[0] instanceof BrickWall).toBeTruthy();
      expect(parts[0].getPosition()).toEqual(new Point(6, 3))
      expect(parts[1].getPosition()).toEqual(new Point(6, 7))
    });

    it("#buildBrickWallBottom", function () {
      var parts = builder.buildBrickWallBottom(new Point(2, 3));
      expect(parts[0] instanceof BrickWall).toBeTruthy();
      expect(parts[0].getPosition()).toEqual(new Point(2, 7))
      expect(parts[1].getPosition()).toEqual(new Point(6, 7))
    });

    it("#buildBrickWallLeft", function () {
      var parts = builder.buildBrickWallLeft(new Point(2, 3));
      expect(parts[0] instanceof BrickWall).toBeTruthy();
      expect(parts[0].getPosition()).toEqual(new Point(2, 3))
      expect(parts[1].getPosition()).toEqual(new Point(2, 7))
    });

    it("#buildBrickWallTop", function () {
      var parts = builder.buildBrickWallTop(new Point(2, 3));
      expect(parts[0] instanceof BrickWall).toBeTruthy();
      expect(parts[0].getPosition()).toEqual(new Point(2, 3))
      expect(parts[1].getPosition()).toEqual(new Point(6, 3))
    });

    it("#buildBrickWallFull", function () {
      var parts = builder.buildBrickWallFull(new Point(2, 3));
      expect(parts[0] instanceof BrickWall).toBeTruthy();
      expect(parts[0].getPosition()).toEqual(new Point(2, 3))
      expect(parts[1].getPosition()).toEqual(new Point(6, 3))
      expect(parts[2].getPosition()).toEqual(new Point(2, 7))
      expect(parts[3].getPosition()).toEqual(new Point(6, 7))
    });
  });
});
