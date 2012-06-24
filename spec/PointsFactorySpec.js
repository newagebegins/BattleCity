describe("PointsFactory", function () {
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var factory = new PointsFactory(eventManager);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(factory,
      [TankExplosion.Event.DESTROYED, PowerUp.Event.PICK]);
  });
  
  describe("#notify", function () {
    describe("TankExplosion.Event.DESTROYED", function () {
      it("enemy tank - 100 points", function () {
        var eventManager = new EventManager();
        var factory = new PointsFactory(eventManager);
        spyOn(factory, 'create');
        var tank = new Tank(eventManager);
        tank.makeEnemy();
        tank.setValue(100);
        var explosion = new TankExplosion(eventManager, tank);
        factory.notify({'name': TankExplosion.Event.DESTROYED, 'explosion': explosion});
        expect(factory.create).toHaveBeenCalledWith(explosion.getCenter(), tank.getValue(), Points.Type.TANK);
      });
      
      it("enemy tank - 0 points", function () {
        var eventManager = new EventManager();
        var factory = new PointsFactory(eventManager);
        spyOn(factory, 'create');
        var tank = new Tank(eventManager);
        tank.makeEnemy();
        tank.setValue(0);
        var explosion = new TankExplosion(eventManager, tank);
        factory.notify({'name': TankExplosion.Event.DESTROYED, 'explosion': explosion});
        expect(factory.create).not.toHaveBeenCalled();
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
      
      it("power-up", function () {
        var eventManager = new EventManager();
        var factory = new PointsFactory(eventManager);
        spyOn(factory, 'create');
        var powerUp = new PowerUp(eventManager);
        powerUp.setPosition(new Point(1, 2));
        powerUp.setValue(200);
        factory.notify({'name': PowerUp.Event.PICK, 'powerUp': powerUp});
        expect(factory.create).toHaveBeenCalledWith(powerUp.getCenter(), powerUp.getValue(), Points.Type.POWERUP);
      });
    });
  });
  
  it("#create", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'fireEvent');
    var factory = new PointsFactory(eventManager);
    factory.setPointsSize(4);
    var tank = new Tank(eventManager);
    tank.setValue(300);
    var explosion = new TankExplosion(eventManager, tank);
    explosion.setRect(new Rect(2, 1, 10, 10));
    var points = factory.create(explosion.getCenter(), tank.getValue(), Points.Type.TANK);
    expect(points instanceof Points).toBeTruthy();
    expect(points.getRect()).toEqual(new Rect(5, 4, 4, 4));
    expect(points.getValue()).toEqual(tank.getValue());
    expect(points.getType()).toEqual(Points.Type.TANK);
    expect(eventManager.fireEvent).toHaveBeenCalledWith({'name': PointsFactory.Event.POINTS_CREATED, 'points': points});
  });
});
