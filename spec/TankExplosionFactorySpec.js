describe("TankExplosionFactory", function () {
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var factory = new TankExplosionFactory(eventManager);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(factory, [Tank.Event.DESTROYED]);
  });
  
  it("default state", function () {
    var eventManager = new EventManager();
    var factory = new TankExplosionFactory(eventManager);
    expect(factory.getExplosionSize()).toEqual(64);
  });
  
  describe("#notify", function () {
    it("Tank.Event.DESTROYED", function () {
      var eventManager = new EventManager();
      var tank = new Tank(eventManager);
      var factory = new TankExplosionFactory(eventManager);
      spyOn(factory, 'create');
      factory.notify({'name': Tank.Event.DESTROYED, 'tank': tank});
      expect(factory.create).toHaveBeenCalledWith(tank);
    });
  });
  
  it("#create", function () {
    var EXPLOSION_SIZE = 4;
    var eventManager = new EventManager();
    var factory = new TankExplosionFactory(eventManager);
    factory.setExplosionSize(EXPLOSION_SIZE);
    var tank = new Tank(eventManager);
    tank.setRect(new Rect(5, 6, 2, 2));
    var explosion = factory.create(tank);
    expect(explosion instanceof TankExplosion).toBeTruthy();
    expect(explosion.getRect()).toEqual(new Rect(4, 5, EXPLOSION_SIZE, EXPLOSION_SIZE));
    expect(explosion.getTank()).toBe(tank);
  });
});
