describe("TankController", function () {
  describe("KEY_DOWN", function () {
    it("LEFT", function () {
      checkKey(Tank.Direction.RIGHT, Keyboard.Key.LEFT, Tank.Direction.LEFT);
    });

    it("RIGHT", function () {
      checkKey(Tank.Direction.LEFT, Keyboard.Key.RIGHT, Tank.Direction.RIGHT);
    });

    it("UP", function () {
      checkKey(Tank.Direction.LEFT, Keyboard.Key.UP, Tank.Direction.UP);
    });

    it("DOWN", function () {
      checkKey(Tank.Direction.LEFT, Keyboard.Key.DOWN, Tank.Direction.DOWN);
    });

    function checkKey(initialDirection, pressedKey, expectedDirection) {
      var eventManager = new EventManager();
      var tank = new Tank(eventManager);
      tank.setDirection(initialDirection);
      var tankController = new TankController(tank);

      tankController.notify({name: Keyboard.Event.KEY_DOWN, key: pressedKey});

      expect(tank.getSpeed()).toEqual(Tank.SPEED);
      expect(tank.getDirection()).toEqual(expectedDirection);
    }
  });
  
  describe("KEY_UP", function () {
    it("should stop the tank", function () {
      var eventManager = new EventManager();
      var tank = new Tank(eventManager);
      tank.setSpeed(Tank.SPEED);
      var tankController = new TankController(tank);
      
      tankController.notify({name: Keyboard.Event.KEY_UP, key: Keyboard.Key.RIGHT});
      
      expect(tank.getSpeed()).toEqual(0);
    });
  });
});
