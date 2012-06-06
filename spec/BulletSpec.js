describe("Bullet", function () {
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var bullet = new Bullet(eventManager);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(bullet,
      [CollisionDetector.Event.OUT_OF_BOUNDS]);
  });
  
  it("should fire event when goes out of bounds", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'fireEvent');
    var bullet = new Bullet(eventManager);
    bullet.notify({'name': CollisionDetector.Event.OUT_OF_BOUNDS, 'sprite': bullet});
    expect(eventManager.fireEvent).toHaveBeenCalledWith({'name': Bullet.Event.DESTROYED});
  });
});
