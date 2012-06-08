describe("Painter", function () {
  it("should draw sprites", function () {
    var eventManager = new EventManager();
    var tank = new Tank(eventManager);
    spyOn(tank, 'draw');
    var wall = new BrickWall(eventManager);
    spyOn(wall, 'draw');
    var painter = new Painter(eventManager);
    painter.addSprite(tank);
    painter.addSprite(wall);
    
    var ctx = 'ctx';
    painter.draw(ctx);
    
    expect(tank.draw).toHaveBeenCalledWith(ctx);
    expect(wall.draw).toHaveBeenCalledWith(ctx);
  });
});
