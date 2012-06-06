describe("CollisionDetector", function () {
  it("should fire event when collision takes place", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'fireEvent').andCallThrough();
    
    var tank = new Tank(eventManager);
    tank.setRect(new Rect(0, 0, 1, 1));
    tank.setSpeed(1);
    tank.setDirection(Sprite.Direction.RIGHT);
    
    var wall = new Wall(eventManager);
    wall.setRect(new Rect(1, 0, 1, 1));
    
    var bounds = new Rect(0, 0, 100, 100);
    var collisionDetector = new CollisionDetector(eventManager, bounds);
    eventManager.addSubscriber(collisionDetector, [Sprite.Event.MOVED])
    collisionDetector.addObject(tank);
    collisionDetector.addObject(wall);
    
    tank.move();
    
    expect(eventManager.fireEvent).toHaveBeenCalledWith({
      'name': CollisionDetector.Event.COLLISION,
      'initiator': tank,
      'object': wall});
  });
  
  it("should fire event when sprite goes out of bounds", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'fireEvent').andCallThrough();
    
    var tank = new Tank(eventManager);
    tank.setRect(new Rect(0, 0, 1, 1));
    tank.setSpeed(1);
    tank.setDirection(Sprite.Direction.LEFT);
    
    var bounds = new Rect(0, 0, 10, 5);
    var collisionDetector = new CollisionDetector(eventManager, bounds);
    eventManager.addSubscriber(collisionDetector, [Sprite.Event.MOVED])
    collisionDetector.addObject(tank);
    
    tank.move();
    
    expect(eventManager.fireEvent).toHaveBeenCalledWith({
      'name': CollisionDetector.Event.OUT_OF_BOUNDS,
      'sprite': tank});
  });
});
