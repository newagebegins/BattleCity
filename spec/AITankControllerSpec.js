describe("AITankController", function () {
  it("should fire event on creation", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'fireEvent');
    var controller = new AITankController(new Tank(eventManager), new Random());
    expect(eventManager.fireEvent).toHaveBeenCalledWith({'name': AITankController.Event.CREATED, 'controller': controller});
  });
});

describe("AITankController", function () {
  var eventManager, tank, random, controller;
  
  beforeEach(function () {
    eventManager = new EventManager();
    tank = new Tank(eventManager);
    random = new Random();
    controller = new AITankController(tank, random);
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
  
  it("#update", function () {
    spyOn(controller, 'updateShoot');
    controller.update();
    expect(controller.updateShoot).toHaveBeenCalled();
  });
});
