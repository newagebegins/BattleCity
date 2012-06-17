describe("PlayerTankControllerFactory", function () {
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var factory = new PlayerTankControllerFactory(eventManager);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(factory, [PlayerTankFactory.Event.PLAYER_TANK_CREATED]);
  });
  
  describe("#notify", function () {
    it("PlayerTankFactory.Event.PLAYER_TANK_CREATED", function () {
      var eventManager = new EventManager();
      var factory = new PlayerTankControllerFactory(eventManager);
      spyOn(factory, 'create');
      var tank = new Tank(eventManager);
      factory.notify({'name': PlayerTankFactory.Event.PLAYER_TANK_CREATED, 'tank': tank});
      expect(factory.create).toHaveBeenCalledWith(tank);
    });
  });
  
  it("#create", function () {
    var eventManager = new EventManager();
    var factory = new PlayerTankControllerFactory(eventManager);
    var tank = new Tank(eventManager);
    var controller = factory.create(tank);
    expect(controller instanceof TankController).toBeTruthy();
  });
});
