describe("TankController", function () {
  describe("should move the tank if the direction key is pressed", function () {
    var SPEED = 4;
    
    it("LEFT - move left", function () {
      checkPressedKey(Tank.Direction.RIGHT, Keyboard.Key.LEFT, SPEED, Tank.Direction.LEFT);
    });

    it("RIGHT - move right", function () {
      checkPressedKey(Tank.Direction.LEFT, Keyboard.Key.RIGHT, SPEED, Tank.Direction.RIGHT);
    });

    it("UP - move up", function () {
      checkPressedKey(Tank.Direction.LEFT, Keyboard.Key.UP, SPEED, Tank.Direction.UP);
    });

    it("DOWN - move down", function () {
      checkPressedKey(Tank.Direction.LEFT, Keyboard.Key.DOWN, SPEED, Tank.Direction.DOWN);
    });
    
    it("SPACE - don't move", function () {
      checkPressedKey(Tank.Direction.LEFT, Keyboard.Key.SPACE, 0, Tank.Direction.LEFT);
    });

    function checkPressedKey(initialDirection, pressedKey, expectedSpeed, expectedDirection) {
      var eventManager = new EventManager();
      var tank = new Tank(eventManager);
      tank.setNormalSpeed(SPEED);
      tank.setDirection(initialDirection);
      var tankController = new TankController(tank);

      tankController.notify({name: Keyboard.Event.KEY_PRESSED, key: pressedKey});

      expect(tank.getSpeed()).toEqual(expectedSpeed);
      expect(tank.getDirection()).toEqual(expectedDirection);
    }
  });
  
  describe("KEY_RELEASED", function () {
    var SPEED = 4;
    
    it("should stop the tank when released key is the current direction key", function () {
      checkReleasedKey(Keyboard.Key.RIGHT, 0);
    });
    
    it("shouldn't stop the tank when released key is not the current direction key", function () {
      checkReleasedKey(Keyboard.Key.LEFT, SPEED);
    });
    
    function checkReleasedKey(key, expectedSpeed) {
      var eventManager = new EventManager();
      var tank = new Tank(eventManager);
      tank.setSpeed(SPEED);
      tank.setDirection(Tank.Direction.RIGHT);
      var tankController = new TankController(tank);
      
      tankController.notify({name: Keyboard.Event.KEY_RELEASED, key: key});
      
      expect(tank.getSpeed()).toEqual(expectedSpeed);
    }
  });
});
