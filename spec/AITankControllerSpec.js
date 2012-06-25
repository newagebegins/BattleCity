describe("AITankController", function () {
  it("should fire event on creation", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'fireEvent');
    var controller = new AITankController(new Tank(eventManager), new Random());
    expect(eventManager.fireEvent).toHaveBeenCalledWith({'name': AITankController.Event.CREATED, 'controller': controller});
  });
  
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var controller = new AITankController(new Tank(eventManager), new Random());
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(controller,
      [Tank.Event.DESTROYED, PowerUpHandler.Event.FREEZE, FreezeTimer.Event.UNFREEZE]);
  });
  
  it("should set tank's speed", function () {
    var eventManager = new EventManager();
    var tank = new Tank(eventManager);
    spyOn(tank, 'toNormalSpeed');
    var controller = new AITankController(tank, new Random());
    expect(tank.toNormalSpeed).toHaveBeenCalled();
  });
});

describe("AITankController", function () {
  var eventManager, tank, random, spriteContainer, base, controller;
  
  beforeEach(function () {
    eventManager = new EventManager();
    tank = new Tank(eventManager);
    random = new Random();
    spriteContainer = new SpriteContainer(eventManager);
    base = new Base(eventManager);
    spyOn(spriteContainer, 'getBase').andReturn(base);
    controller = new AITankController(tank, random, spriteContainer);
  });
  
  describe("#updateShoot", function () {
    it("interval - 1, probability - 1", function () {
      spyOn(tank, 'shoot');
      spyOn(random, 'getNumber').andReturn(0.7);
      controller.setShootInterval(1);
      controller.setShootProbability(1);
      controller.updateShoot();
      expect(tank.shoot).toHaveBeenCalled();
    });
    
    it("interval - 3, probability - 1", function () {
      spyOn(tank, 'shoot');
      spyOn(random, 'getNumber').andReturn(0.7);
      controller.setShootInterval(3);
      controller.setShootProbability(1);
      controller.updateShoot();
      expect(tank.shoot).not.toHaveBeenCalled();
      controller.updateShoot();
      expect(tank.shoot).not.toHaveBeenCalled();
      controller.updateShoot();
      expect(tank.shoot).toHaveBeenCalled();
      tank.shoot.reset();
      controller.updateShoot();
      expect(tank.shoot).not.toHaveBeenCalled();
      controller.updateShoot();
      expect(tank.shoot).not.toHaveBeenCalled();
      controller.updateShoot();
      expect(tank.shoot).toHaveBeenCalled();
    });
    
    describe("interval - 1, probability - 0.5", function () {
      beforeEach(function () {
        spyOn(tank, 'shoot');
        controller.setShootInterval(1);
        controller.setShootProbability(0.5);
      });

      it("random - 0.6", function () {
        spyOn(random, 'getNumber').andReturn(0.6);
        controller.updateShoot();
        expect(tank.shoot).not.toHaveBeenCalled();
      });

      it("random - 0.5", function () {
        spyOn(random, 'getNumber').andReturn(0.5);
        controller.updateShoot();
        expect(tank.shoot).not.toHaveBeenCalled();
      });

      it("random - 0.4", function () {
        spyOn(random, 'getNumber').andReturn(0.4);
        controller.updateShoot();
        expect(tank.shoot).toHaveBeenCalled();
      });

      it("random - 0.3", function () {
        spyOn(random, 'getNumber').andReturn(0.3);
        controller.updateShoot();
        expect(tank.shoot).toHaveBeenCalled();
      });
    });
  });
  
  describe("#updateDirection", function () {
    it("interval - 1, probability - 1", function () {
      spyOn(tank, 'setDirection');
      spyOn(random, 'getNumber').andReturn(0.7);
      controller.setDirectionUpdateInterval(1);
      controller.setDirectionUpdateProbability(1);
      controller.updateDirection();
      expect(tank.setDirection).toHaveBeenCalled();
    });
    
    it("interval - 3, probability - 1", function () {
      spyOn(tank, 'setDirection');
      spyOn(random, 'getNumber').andReturn(0.7);
      controller.setDirectionUpdateInterval(3);
      controller.setDirectionUpdateProbability(1);
      controller.updateDirection();
      expect(tank.setDirection).not.toHaveBeenCalled();
      controller.updateDirection();
      expect(tank.setDirection).not.toHaveBeenCalled();
      controller.updateDirection();
      expect(tank.setDirection).toHaveBeenCalled();
      tank.setDirection.reset();
      controller.updateDirection();
      expect(tank.setDirection).not.toHaveBeenCalled();
      controller.updateDirection();
      expect(tank.setDirection).not.toHaveBeenCalled();
      controller.updateDirection();
      expect(tank.setDirection).toHaveBeenCalled();
    });
    
    describe("interval - 1, probability - 0.5", function () {
      beforeEach(function () {
        spyOn(tank, 'setDirection');
        controller.setDirectionUpdateInterval(1);
        controller.setDirectionUpdateProbability(0.5);
      });

      it("random - 0.6", function () {
        spyOn(random, 'getNumber').andReturn(0.6);
        controller.updateDirection();
        expect(tank.setDirection).not.toHaveBeenCalled();
      });

      it("random - 0.5", function () {
        spyOn(random, 'getNumber').andReturn(0.5);
        controller.updateDirection();
        expect(tank.setDirection).not.toHaveBeenCalled();
      });

      it("random - 0.4", function () {
        spyOn(random, 'getNumber').andReturn(0.4);
        controller.updateDirection();
        expect(tank.setDirection).toHaveBeenCalled();
      });

      it("random - 0.3", function () {
        spyOn(random, 'getNumber').andReturn(0.3);
        controller.updateDirection();
        expect(tank.setDirection).toHaveBeenCalled();
      });
    });
  });
  
  describe("#update", function () {
    it("normal", function () {
      spyOn(controller, 'updateShoot');
      spyOn(controller, 'updateDirection');
      controller.update();
      expect(controller.updateShoot).toHaveBeenCalled();
      expect(controller.updateDirection).toHaveBeenCalled();
    });
    
    it("pause", function () {
      spyOn(controller, 'updateShoot');
      spyOn(controller, 'updateDirection');
      eventManager.fireEvent({'name': Pause.Event.START});
      controller.update();
      expect(controller.updateShoot).not.toHaveBeenCalled();
      expect(controller.updateDirection).not.toHaveBeenCalled();
    });
    
    it("freeze", function () {
      spyOn(controller, 'updateShoot');
      spyOn(controller, 'updateDirection');
      controller.freeze();
      controller.update();
      expect(controller.updateShoot).not.toHaveBeenCalled();
      expect(controller.updateDirection).not.toHaveBeenCalled();
    });
  });
  
  describe("#notify", function () {
    it("Tank.Event.DESTROYED", function () {
      spyOn(controller, 'destroy');
      controller.notify({'name': Tank.Event.DESTROYED, 'tank': tank});
      expect(controller.destroy).toHaveBeenCalled();
    });
    
    it("PowerUpHandler.Event.FREEZE", function () {
      controller.notify({'name': PowerUpHandler.Event.FREEZE});
      expect(controller.isFreezed()).toBeTruthy();
      expect(tank.getSpeed()).toEqual(0);
    });
    
    it("FreezeTimer.Event.UNFREEZE", function () {
      controller.freeze();
      controller.notify({'name': FreezeTimer.Event.UNFREEZE});
      expect(controller.isFreezed()).toBeFalsy();
      expect(tank.getSpeed()).toEqual(tank.getNormalSpeed());
    });
  });
  
  it("#destroy", function () {
    spyOn(eventManager, 'fireEvent');
    spyOn(eventManager, 'removeSubscriber');
    var pauseListener = new PauseListener(eventManager);
    spyOn(pauseListener, 'destroy');
    controller.setPauseListener(pauseListener);
    controller.destroy();
    expect(eventManager.removeSubscriber).toHaveBeenCalledWith(controller);
    expect(eventManager.fireEvent).toHaveBeenCalledWith({'name': AITankController.Event.DESTROYED, 'controller': controller});
    expect(pauseListener.destroy).toHaveBeenCalled();
  });
});
