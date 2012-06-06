describe("Updater", function () {
  it("should update sprites", function () {
    var eventManager = new EventManager();
    var tank = new Tank(eventManager);
    spyOn(tank, 'update');
    var wall = new Wall(eventManager);
    spyOn(wall, 'update');
    var updater = new Updater(eventManager);
    updater.addSprite(tank);
    updater.addSprite(wall);
    
    updater.update();
    
    expect(tank.update).toHaveBeenCalled();
    expect(wall.update).toHaveBeenCalled();
  });
});
