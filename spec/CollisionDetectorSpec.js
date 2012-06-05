describe("CollisionDetector", function () {
  it("should fire event when collision takes place", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'fireEvent').andCallThrough();
    
    var tank = new Tank(eventManager);
    tank.setRect(new Rect(0, 0, 1, 1));
    tank.setSpeed(1);
    tank.setDirection(Tank.Direction.RIGHT);
    
    var wall = new Wall();
    wall.setRect(new Rect(1, 0, 1, 1));
    
    var collisionDetector = new CollisionDetector(eventManager);
    collisionDetector.addObject(tank);
    collisionDetector.addObject(wall);
    
    tank.move();
    
    expect(eventManager.fireEvent).toHaveBeenCalledWith({
      'name': CollisionDetector.Event.COLLISION,
      'initiator': tank,
      'object': wall});
  });
});
