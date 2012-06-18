describe("SpriteController", function () {
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var sprite = new Sprite(eventManager);
    var spriteController = new SpriteController(eventManager, sprite);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(spriteController,
      [Keyboard.Event.KEY_PRESSED, Keyboard.Event.KEY_RELEASED]);
  });
  
  describe("should move the sprite if the direction key is pressed", function () {
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
      var sprite = new Sprite(eventManager);
      sprite.setNormalSpeed(SPEED);
      sprite.setDirection(initialDirection);
      var spriteController = new SpriteController(eventManager, sprite);

      spriteController.notify({name: Keyboard.Event.KEY_PRESSED, key: pressedKey});

      expect(sprite.getSpeed()).toEqual(expectedSpeed);
      expect(sprite.getDirection()).toEqual(expectedDirection);
    }
  });
  
  describe("KEY_RELEASED", function () {
    var SPEED = 4;
    
    it("should stop the sprite when released key is the current direction key", function () {
      checkReleasedKey(Keyboard.Key.RIGHT, 0);
    });
    
    it("shouldn't stop the sprite when released key is not the current direction key", function () {
      checkReleasedKey(Keyboard.Key.LEFT, SPEED);
    });
    
    function checkReleasedKey(key, expectedSpeed) {
      var eventManager = new EventManager();
      var sprite = new Sprite(eventManager);
      sprite.setSpeed(SPEED);
      sprite.setDirection(Sprite.Direction.RIGHT);
      var spriteController = new SpriteController(eventManager, sprite);
      
      spriteController.notify({name: Keyboard.Event.KEY_RELEASED, key: key});
      
      expect(sprite.getSpeed()).toEqual(expectedSpeed);
    }
  });
  
  describe("#notify", function () {
    it("pause", function () {
      var eventManager = new EventManager();
      var sprite = new Sprite(eventManager);
      var controller = new SpriteController(eventManager, sprite);
      eventManager.fireEvent({'name': Pause.Event.START});
      spyOn(controller, 'keyPressed');
      controller.notify({name: Keyboard.Event.KEY_PRESSED, key: Keyboard.Key.RIGHT});
      expect(controller.keyPressed).not.toHaveBeenCalled();
    });
  });
});
