describe("TankController", function () {
  describe("should move the tank if the direction key is pressed", function () {
    var SPEED = 4;
    
    it("LEFT - move left", function () {
      checkKeyDown(Tank.Direction.RIGHT, Keyboard.Key.LEFT, SPEED, Tank.Direction.LEFT);
    });

    it("RIGHT - move right", function () {
      checkKeyDown(Tank.Direction.LEFT, Keyboard.Key.RIGHT, SPEED, Tank.Direction.RIGHT);
    });

    it("UP - move up", function () {
      checkKeyDown(Tank.Direction.LEFT, Keyboard.Key.UP, SPEED, Tank.Direction.UP);
    });

    it("DOWN - move down", function () {
      checkKeyDown(Tank.Direction.LEFT, Keyboard.Key.DOWN, SPEED, Tank.Direction.DOWN);
    });
    
    it("SPACE - don't move", function () {
      checkKeyDown(Tank.Direction.LEFT, Keyboard.Key.SPACE, 0, Tank.Direction.LEFT);
    });

    function checkKeyDown(initialDirection, pressedKey, expectedSpeed, expectedDirection) {
      var eventManager = new EventManager();
      var tank = new Tank(eventManager);
      tank.setNormalSpeed(SPEED);
      tank.setDirection(initialDirection);
      var tankController = new TankController(tank);

      tankController.notify({name: Keyboard.Event.KEY_DOWN, key: pressedKey});

      expect(tank.getSpeed()).toEqual(expectedSpeed);
      expect(tank.getDirection()).toEqual(expectedDirection);
    }
  });
  
  describe("KEY_UP", function () {
    var SPEED = 4;
    
    it("should stop the tank when released key is the current direction key", function () {
      checkKeyUp(Keyboard.Key.RIGHT, 0);
    });
    
    it("shouldn't stop the tank when released key is not the current direction key", function () {
      checkKeyUp(Keyboard.Key.LEFT, SPEED);
    });
    
    function checkKeyUp(key, expectedSpeed) {
      var eventManager = new EventManager();
      var tank = new Tank(eventManager);
      tank.setSpeed(SPEED);
      tank.setDirection(Tank.Direction.RIGHT);
      var tankController = new TankController(tank);
      
      tankController.notify({name: Keyboard.Event.KEY_UP, key: key});
      
      expect(tank.getSpeed()).toEqual(expectedSpeed);
    }
  });
});
