describe("PowerUpFactory", function () {
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var factory = new PowerUpFactory(eventManager);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(factory, [Tank.Event.FLASHING_TANK_DESTROYED]);
  });
  
  describe("#notify", function () {
    it("Tank.Event.FLASHING_TANK_DESTROYED", function () {
      var eventManager = new EventManager();
      var factory = new PowerUpFactory(eventManager);
      spyOn(factory, 'create');
      var tank = new Tank(eventManager);
      factory.notify({'name': Tank.Event.FLASHING_TANK_DESTROYED, 'tank': tank});
      expect(factory.create).toHaveBeenCalled();
    });
  });
  
  it("#create", function () {
    var eventManager = new EventManager();
    var factory = new PowerUpFactory(eventManager);
    factory.setPositions([new Point(0, 0)]);
    var powerUp = factory.create();
    expect(powerUp instanceof PowerUp).toBeTruthy();
  });
});
