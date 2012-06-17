describe("Painter", function () {
  it("should draw sprites", function () {
    var eventManager = new EventManager();
    var tank = new Tank(eventManager);
    spyOn(tank, 'draw');
    var wall = new BrickWall(eventManager);
    spyOn(wall, 'draw');
    
    var spriteContainer = new SpriteContainer(eventManager);
    spriteContainer.addSprite(tank);
    spriteContainer.addSprite(wall);
    
    var painter = new Painter(spriteContainer);
    var ctx = 'ctx';
    painter.draw(ctx);
    
    expect(tank.draw).toHaveBeenCalledWith(ctx);
    expect(wall.draw).toHaveBeenCalledWith(ctx);
  });
});
