describe("BaseExplosionFactory", function () {
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var factory = new BaseExplosionFactory(eventManager);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(factory, [Base.Event.HIT]);
  });
  
  it("default state", function () {
    var eventManager = new EventManager();
    var factory = new BaseExplosionFactory(eventManager);
    expect(factory.getExplosionSize()).toEqual(64);
  });
  
  describe("#notify", function () {
    it("Tank.Event.DESTROYED", function () {
      var eventManager = new EventManager();
      var base = new Base(eventManager);
      var factory = new BaseExplosionFactory(eventManager);
      spyOn(factory, 'create');
      factory.notify({'name': Base.Event.HIT, 'base': base});
      expect(factory.create).toHaveBeenCalledWith(base);
    });
  });
  
  it("#create", function () {
    var EXPLOSION_SIZE = 4;
    var eventManager = new EventManager();
    var factory = new BaseExplosionFactory(eventManager);
    factory.setExplosionSize(EXPLOSION_SIZE);
    var base = new Base(eventManager);
    base.setRect(new Rect(5, 6, 2, 2));
    var explosion = factory.create(base);
    expect(explosion instanceof BaseExplosion).toBeTruthy();
    expect(explosion.getRect()).toEqual(new Rect(4, 5, EXPLOSION_SIZE, EXPLOSION_SIZE));
  });
});
