describe("PointsFactory", function () {
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var factory = new PointsFactory(eventManager);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(factory, [TankExplosion.Event.DESTROYED]);
  });
  
  describe("#notify", function () {
    describe("TankExplosion.Event.DESTROYED", function () {
      it("enemy tank", function () {
        var eventManager = new EventManager();
        var factory = new PointsFactory(eventManager);
        spyOn(factory, 'create');
        var tank = new Tank(eventManager);
        tank.makeEnemy();
        var explosion = new TankExplosion(eventManager, tank);
        factory.notify({'name': TankExplosion.Event.DESTROYED, 'explosion': explosion});
        expect(factory.create).toHaveBeenCalledWith(explosion);
      });
      
      it("player tank", function () {
        var eventManager = new EventManager();
        var factory = new PointsFactory(eventManager);
        spyOn(factory, 'create');
        var tank = new Tank(eventManager);
        var explosion = new TankExplosion(eventManager, tank);
        factory.notify({'name': TankExplosion.Event.DESTROYED, 'explosion': explosion});
        expect(factory.create).not.toHaveBeenCalled();
      });
    });
  });
  
  it("#create", function () {
    var eventManager = new EventManager();
    var factory = new PointsFactory(eventManager);
    factory.setPointsSize(4);
    var tank = new Tank(eventManager);
    tank.setValue(300);
    var explosion = new TankExplosion(eventManager, tank);
    explosion.setRect(new Rect(2, 1, 10, 10));
    var points = factory.create(explosion);
    expect(points instanceof Points).toBeTruthy();
    expect(points.getRect()).toEqual(new Rect(5, 4, 4, 4));
    expect(points.getValue()).toEqual(tank.getValue());
  });
});
