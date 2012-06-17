describe("AITankControllerFactory", function () {
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var factory = new AITankControllerFactory(eventManager);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(factory, [EnemyFactory.Event.ENEMY_CREATED]);
  });
  
  describe("#notify", function () {
    it("EnemyFactory.Event.ENEMY_CREATED", function () {
      var eventManager = new EventManager();
      var factory = new AITankControllerFactory(eventManager);
      spyOn(factory, 'createController');
      var tank = new Tank(eventManager);
      factory.notify({'name': EnemyFactory.Event.ENEMY_CREATED, 'enemy': tank});
      expect(factory.createController).toHaveBeenCalledWith(tank);
    });
  });
  
  it("#createController", function () {
    var eventManager = new EventManager();
    var factory = new AITankControllerFactory(eventManager);
    var tank = new Tank(eventManager);
    var controller = factory.createController(tank);
    expect(controller instanceof AITankController).toBeTruthy();
  });
});
