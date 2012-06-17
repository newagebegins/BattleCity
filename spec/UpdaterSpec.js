describe("Updater", function () {
  it("should update sprites", function () {
    var eventManager = new EventManager();
    var tank = new Tank(eventManager);
    spyOn(tank, 'update');
    var wall = new Wall(eventManager);
    spyOn(wall, 'update');
    
    var spriteContainer = new SpriteContainer(eventManager);
    spriteContainer.addSprite(tank);
    spriteContainer.addSprite(wall);
    
    var updater = new Updater(spriteContainer);
    updater.update();
    
    expect(tank.update).toHaveBeenCalled();
    expect(wall.update).toHaveBeenCalled();
  });
});
