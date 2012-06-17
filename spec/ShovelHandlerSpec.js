describe("ShovelHandler", function () {
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var handler = new ShovelHandler(eventManager);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(handler, [PowerUpHandler.Event.SHOVEL_START]);
  });
  
  describe("#notify", function () {
    it("PowerUpHandler.Event.SHOVEL_START", function () {
      var eventManager = new EventManager();
      var handler = new ShovelHandler(eventManager);
      spyOn(handler, 'start');
      handler.notify({'name': PowerUpHandler.Event.SHOVEL_START});
      expect(handler.start).toHaveBeenCalled();
    });
  });
  
  it("#start", function () {
    var eventManager = new EventManager();
    var baseWallBuilder = new BaseWallBuilder();
    
    var handler = new ShovelHandler(eventManager);
    handler.setBaseWallBuilder(baseWallBuilder);
    
    spyOn(handler, 'rebuildWall');
    
    handler.start();
    
    expect(handler.rebuildWall).toHaveBeenCalledWith(new SteelWallFactory(eventManager));
  });
  
  it("#end", function () {
    var eventManager = new EventManager();
    var baseWallBuilder = new BaseWallBuilder();
    
    var handler = new ShovelHandler(eventManager);
    handler.setBaseWallBuilder(baseWallBuilder);
    
    spyOn(handler, 'rebuildWall');
    
    handler.end();
    
    expect(handler.rebuildWall).toHaveBeenCalledWith(new BrickWallFactory(eventManager));
  });
  
  it("#rebuildWall", function () {
    var eventManager = new EventManager();
    var baseWallBuilder = new BaseWallBuilder();
    
    var handler = new ShovelHandler(eventManager);
    handler.setBaseWallBuilder(baseWallBuilder);
    
    spyOn(baseWallBuilder, 'destroyWall');
    spyOn(baseWallBuilder, 'setWallFactory');
    spyOn(baseWallBuilder, 'buildWall');
    
    var wallFactory = new SteelWallFactory(eventManager);
    handler.rebuildWall(wallFactory);
    
    expect(baseWallBuilder.destroyWall).toHaveBeenCalled();
    expect(baseWallBuilder.setWallFactory).toHaveBeenCalledWith(wallFactory);
    expect(baseWallBuilder.buildWall).toHaveBeenCalled();
  });
  
  it("#update", function () {
    var eventManager = new EventManager();
    var baseWallBuilder = new BaseWallBuilder();
    baseWallBuilder.setSpriteContainer(new SpriteContainer(eventManager));
    var handler = new ShovelHandler(eventManager);
    handler.setBaseWallBuilder(baseWallBuilder);
    spyOn(handler, 'end');
    handler.setDuration(2);
    handler.start();
    handler.update();
    expect(handler.end).not.toHaveBeenCalled();
    handler.update();
    expect(handler.end).not.toHaveBeenCalled();
    handler.update();
    expect(handler.end).toHaveBeenCalled();
    handler.end.reset();
    handler.update();
    expect(handler.end).not.toHaveBeenCalled();
    handler.update();
    expect(handler.end).not.toHaveBeenCalled();
    handler.update();
    expect(handler.end).not.toHaveBeenCalled();
    handler.start();
    handler.update();
    expect(handler.end).not.toHaveBeenCalled();
    handler.update();
    expect(handler.end).not.toHaveBeenCalled();
    handler.update();
    expect(handler.end).toHaveBeenCalled();
  });
});
