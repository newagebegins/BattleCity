describe("Bullet", function () {
  var eventManager, tank, bullet;
  
  beforeEach(function () {
    eventManager = new EventManager();
    tank = new Tank(eventManager);
    bullet = new Bullet(eventManager, tank);
  });
  
  it("#destroy", function () {
    spyOn(eventManager, 'fireEvent');
    bullet.destroy();
    expect(eventManager.fireEvent).toHaveBeenCalledWith({'name': Bullet.Event.DESTROYED, 'bullet': bullet, 'tank': tank});
  });
  
  it("should be destroyed when goes out of bounds", function () {
    spyOn(bullet, 'destroy');
    bullet.notify({'name': CollisionDetector.Event.OUT_OF_BOUNDS, 'sprite': bullet});
    expect(bullet.destroy).toHaveBeenCalled();
  });
  
  it("should be destroyed when collides with a wall", function () {
    var wall = new Wall(eventManager);
    spyOn(bullet, 'destroy');
    bullet.notify({
      'name': CollisionDetector.Event.COLLISION,
      'initiator': bullet,
      'sprite': wall});
    expect(bullet.destroy).toHaveBeenCalled();
  });
});

describe("Bullet", function () {
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var tank = new Tank(eventManager);
    var bullet = new Bullet(eventManager, tank);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(bullet,
      [CollisionDetector.Event.OUT_OF_BOUNDS, CollisionDetector.Event.COLLISION]);
  });
});
