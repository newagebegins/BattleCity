describe("AITankControllerFactory", function () {
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var factory = new AITankControllerFactory(eventManager);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(factory,
      [EnemyFactory.Event.ENEMY_CREATED, PowerUpHandler.Event.FREEZE, FreezeTimer.Event.UNFREEZE]);
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
    
    it("PowerUpHandler.Event.FREEZE", function () {
      var eventManager = new EventManager();
      var factory = new AITankControllerFactory(eventManager);
      factory.notify({'name': PowerUpHandler.Event.FREEZE});
      expect(factory.isFreezed()).toBeTruthy();
    });
    
    it("FreezeTimer.Event.UNFREEZE", function () {
      var eventManager = new EventManager();
      var factory = new AITankControllerFactory(eventManager);
      factory.freeze();
      factory.notify({'name': FreezeTimer.Event.UNFREEZE});
      expect(factory.isFreezed()).toBeFalsy();
    });
  });
  
  describe("#createController", function () {
    it("normal", function () {
      var eventManager = new EventManager();
      var factory = new AITankControllerFactory(eventManager);
      var tank = new Tank(eventManager);
      var controller = factory.createController(tank);
      expect(controller instanceof AITankController).toBeTruthy();
    });
    
    it("freezed", function () {
      var eventManager = new EventManager();
      var factory = new AITankControllerFactory(eventManager);
      factory.freeze();
      var tank = new Tank(eventManager);
      var controller = factory.createController(tank);
      expect(controller.isFreezed()).toBeTruthy();
    });
  });
});
