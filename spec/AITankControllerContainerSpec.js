describe("AITankControllerContainer", function () {
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var container = new AITankControllerContainer(eventManager);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(container,
      [AITankController.Event.CREATED, AITankController.Event.DESTROYED]);
  });
  
  it("should remove controller when it is destroyed", function () {
    var eventManager = new EventManager();
    var controller = new AITankController(new Tank(eventManager), new Random());
    
    var container = new AITankControllerContainer(eventManager);
    container.addController(controller);
    
    expect(container.containsController(controller)).toBeTruthy();
    container.notify({'name': AITankController.Event.DESTROYED, 'controller': controller});
    expect(container.containsController(controller)).toBeFalsy();
  });
  
  it("should add controller when it is created", function () {
    var eventManager = new EventManager();
    var controller = new AITankController(new Tank(eventManager), new Random());
    
    var container = new AITankControllerContainer(eventManager);
    
    expect(container.containsController(controller)).toBeFalsy();
    container.notify({'name': AITankController.Event.CREATED, 'controller': controller});
    expect(container.containsController(controller)).toBeTruthy();
  });
});
