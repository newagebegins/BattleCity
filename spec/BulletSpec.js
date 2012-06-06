describe("Bullet", function () {
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var tank = new Tank(eventManager);
    var bullet = new Bullet(eventManager, tank);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(bullet,
      [CollisionDetector.Event.OUT_OF_BOUNDS]);
  });
  
  it("should fire event when goes out of bounds", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'fireEvent');
    var tank = new Tank(eventManager);
    var bullet = new Bullet(eventManager, tank);
    bullet.notify({'name': CollisionDetector.Event.OUT_OF_BOUNDS, 'sprite': bullet});
    expect(eventManager.fireEvent).toHaveBeenCalledWith({'name': Bullet.Event.DESTROYED, 'tank': tank});
  });
});
