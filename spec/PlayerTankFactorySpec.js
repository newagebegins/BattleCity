describe("PlayerTankFactory", function () {
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var factory = new PlayerTankFactory(eventManager);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(factory, [TankExplosion.Event.DESTROYED]);
  });
  
  describe("#notify", function () {
    it("TankExplosion.Event.DESTROYED", function () {
      var eventManager = new EventManager();
      var factory = new PlayerTankFactory(eventManager);
      spyOn(factory, 'create');
      var tank = new Tank(eventManager);
      var explosion = new TankExplosion(eventManager, tank);
      factory.notify({'name': TankExplosion.Event.DESTROYED, 'explosion': explosion});
      expect(factory.create).toHaveBeenCalled();
    });
  });
  
  it("#create", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'fireEvent');
    var factory = new PlayerTankFactory(eventManager);
    factory.setAppearPosition(new Point(1,2));
      
    var tank = new Tank(eventManager);
    tank.setPosition(new Point(1,2));
    tank.setState(new TankStateAppearing(tank));
    
    var product = factory.create();
    expect(product).toEqual(tank);
    expect(eventManager.fireEvent).toHaveBeenCalledWith({'name': PlayerTankFactory.Event.PLAYER_TANK_CREATED, 'tank': tank});
  });
});
