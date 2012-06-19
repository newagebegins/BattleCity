describe("TankController", function () {
  describe("keyPressed", function () {
    it("Keyboard.Key.SPACE", function () {
      var eventManager = new EventManager();
      var tank = new Tank(eventManager);
      spyOn(tank, 'shoot');
      var tankController = new TankController(eventManager, tank);
      tankController.keyPressed(Keyboard.Key.SPACE);
      expect(tank.shoot).toHaveBeenCalled();
    });
  });
});
