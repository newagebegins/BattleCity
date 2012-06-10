describe("TankController", function () {
  describe("SPACE is pressed", function () {
    it("should shoot", function () {
      var eventManager = new EventManager();
      var tank = new Tank(eventManager);
      spyOn(tank, 'shoot');
      var tankController = new TankController(eventManager, tank);
      
      tankController.notify({name: Keyboard.Event.KEY_PRESSED, key: Keyboard.Key.SPACE});
      
      expect(tank.shoot).toHaveBeenCalled();
    });
  });
});
