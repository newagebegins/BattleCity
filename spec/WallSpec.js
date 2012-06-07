describe("Wall", function () {
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var wall = new Wall(eventManager);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(wall, [CollisionDetector.Event.COLLISION]);
  });
  
  it("should be destroyed when hit by a bullet", function () {
    var eventManager = new EventManager();
    var wall = new Wall(eventManager);
    spyOn(wall, 'destroy');
    var tank = new Tank(eventManager);
    var bullet = new Bullet(eventManager, tank);
    wall.notify({'name': CollisionDetector.Event.COLLISION, 'initiator': bullet, 'sprite': wall})
    expect(wall.destroy).toHaveBeenCalled();
  });
});
