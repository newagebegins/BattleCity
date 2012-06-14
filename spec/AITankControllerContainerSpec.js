describe("AITankControllerContainer", function () {
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var container = new AITankControllerContainer(eventManager);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(container,
      [AITankController.Event.CREATED, AITankController.Event.DESTROYED]);
  });
});

describe("AITankControllerContainer", function () {
  var eventManager, controller, container;
  
  beforeEach(function () {
    eventManager = new EventManager();
    controller = new AITankController(new Tank(eventManager), new Random());
    container = new AITankControllerContainer(eventManager);
  });
  
  it("should remove controller when it is destroyed", function () {
    container.addController(controller);
    expect(container.containsController(controller)).toBeTruthy();
    container.notify({'name': AITankController.Event.DESTROYED, 'controller': controller});
    expect(container.containsController(controller)).toBeFalsy();
  });
  
  it("should add controller when it is created", function () {
    expect(container.containsController(controller)).toBeFalsy();
    container.notify({'name': AITankController.Event.CREATED, 'controller': controller});
    expect(container.containsController(controller)).toBeTruthy();
  });
});

describe("AITankControllerContainer", function () {
  it("#update", function () {
    var eventManager = new EventManager();
    var container = new AITankControllerContainer(eventManager);
    var controllerOne = new AITankController(new Tank(eventManager), new Random());
    var controllerTwo = new AITankController(new Tank(eventManager), new Random());
    spyOn(controllerOne, 'update');
    spyOn(controllerTwo, 'update');
    container.update();
    expect(controllerOne.update).toHaveBeenCalled();
    expect(controllerTwo.update).toHaveBeenCalled();
  });
});
