describe("Base", function () {
  it("#getClassName", function () {
    var eventManager = new EventManager();
    var base = new Base(eventManager);
    expect(base.getClassName()).toEqual('Base');
  });
  
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var base = new Base(eventManager);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(base, [CollisionDetector.Event.COLLISION]);
  });
  
  describe("#notify", function () {
    describe("CollisionDetector.Event.COLLISION", function () {
      it("bullet", function () {
        var eventManager = new EventManager();
        var base = new Base(eventManager);
        spyOn(base, 'hit');
        var tank = new Tank(eventManager);
        var bullet = new Bullet(eventManager, tank);
        base.notify({'name': CollisionDetector.Event.COLLISION, 'initiator': bullet, 'sprite': base});
        expect(base.hit).toHaveBeenCalled();
      });
    });
  });
  
  it('#getImage', function () {
    var eventManager = new EventManager();
    var base = new Base(eventManager);
    expect(base.getImage()).toEqual('base');
    base.hit();
    expect(base.getImage()).toEqual('base_destroyed');
  });
  
  it("#hit", function () {
    var eventManager = new EventManager();
    var base = new Base(eventManager);
    spyOn(eventManager, 'fireEvent');
    base.hit();
    var EVENT = {'name': Base.Event.HIT, 'base': base};
    expect(eventManager.fireEvent).toHaveBeenCalledWith(EVENT);
    eventManager.fireEvent.reset();
    base.hit();
    expect(eventManager.fireEvent).not.toHaveBeenCalledWith(EVENT);
  });
});
