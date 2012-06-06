describe("TankController", function () {
  describe("should move the tank if the direction key is pressed", function () {
    var SPEED = 4;
    
    it("LEFT - move left", function () {
      checkPressedKey(Sprite.Direction.RIGHT, Keyboard.Key.LEFT, SPEED, Sprite.Direction.LEFT);
    });

    it("RIGHT - move right", function () {
      checkPressedKey(Sprite.Direction.LEFT, Keyboard.Key.RIGHT, SPEED, Sprite.Direction.RIGHT);
    });

    it("UP - move up", function () {
      checkPressedKey(Sprite.Direction.LEFT, Keyboard.Key.UP, SPEED, Sprite.Direction.UP);
    });

    it("DOWN - move down", function () {
      checkPressedKey(Sprite.Direction.LEFT, Keyboard.Key.DOWN, SPEED, Sprite.Direction.DOWN);
    });
    
    it("SPACE - don't move", function () {
      checkPressedKey(Sprite.Direction.LEFT, Keyboard.Key.SPACE, 0, Sprite.Direction.LEFT);
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
      tank.setDirection(Sprite.Direction.RIGHT);
      var tankController = new TankController(tank);
      
      tankController.notify({name: Keyboard.Event.KEY_RELEASED, key: key});
      
      expect(tank.getSpeed()).toEqual(expectedSpeed);
    }
  });
  
  describe("SPACE is pressed", function () {
    it("should shoot", function () {
      var eventManager = new EventManager();
      var tank = new Tank(eventManager);
      spyOn(tank, 'shoot');
      var tankController = new TankController(tank);
      
      tankController.notify({name: Keyboard.Event.KEY_PRESSED, key: Keyboard.Key.SPACE});
      
      expect(tank.shoot).toHaveBeenCalled();
    });
  });
});
