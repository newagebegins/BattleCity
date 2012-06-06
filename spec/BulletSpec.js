describe("Bullet", function () {
  it("should fire event when goes out of bounds", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'fireEvent');
    var bullet = new Bullet(eventManager);
    bullet.notify({'name': CollisionDetector.Event.OUT_OF_BOUNDS, 'sprite': bullet});
    expect(eventManager.fireEvent).toHaveBeenCalledWith({'name': Bullet.Event.DESTROYED});
  });
});
