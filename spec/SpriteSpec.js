describe("Sprite", function () {
  var eventManager, sprite;
    
  beforeEach(function () {
    eventManager = new EventManager();
    sprite = new Sprite(eventManager);
  });
  
  it("initial state", function () {
    expect(sprite.getDirection()).toEqual(Sprite.Direction.RIGHT);
    expect(sprite.getPrevDirection()).toEqual(Sprite.Direction.RIGHT);
    expect(sprite.getNormalSpeed()).toEqual(0);
    expect(sprite.getSpeed()).toEqual(0);
    expect(sprite.isDestroyed()).toBeFalsy();
    expect(sprite.isTurn()).toBeFalsy();
    expect(sprite.getZIndex()).toEqual(0);
  });
  
  describe("#move", function () {
    it("speed not zero", function () {
      sprite.setSpeed(1);
      spyOn(sprite, 'doMove');
      sprite.move();
      expect(sprite.doMove).toHaveBeenCalled();
    });
    
    it("speed is zero", function () {
      spyOn(sprite, 'doMove');
      sprite.move();
      expect(sprite.doMove).not.toHaveBeenCalled();
    });
    
    it("frequency - 2", function () {
      sprite.setMoveFrequency(2);
      sprite.setSpeed(1);
      spyOn(sprite, 'doMove');
      sprite.move();
      expect(sprite.doMove).not.toHaveBeenCalled();
      sprite.move();
      expect(sprite.doMove).toHaveBeenCalled();
      sprite.doMove.reset();
      sprite.move();
      expect(sprite.doMove).not.toHaveBeenCalled();
      sprite.move();
      expect(sprite.doMove).toHaveBeenCalled();
    });
  });
  
  describe("#doMove", function () {
    it("should fire event", function () {
      spyOn(eventManager, 'fireEvent');
      sprite.doMove();
      expect(eventManager.fireEvent).toHaveBeenCalledWith({
        'name': Sprite.Event.MOVED,
        'sprite': sprite});
    });
  });
  
  describe("can move", function () {
    var INIT_X = 0, INIT_Y = 0, SPEED = 1;
    
    it("right", function () {
      checkDirection(Sprite.Direction.RIGHT, new Point(INIT_X + SPEED, INIT_Y))
    });

    it("left", function () {
      checkDirection(Sprite.Direction.LEFT, new Point(INIT_X - SPEED, INIT_Y))
    });
    
    it("up", function () {
      checkDirection(Sprite.Direction.UP, new Point(INIT_X, INIT_Y - SPEED))
    });
    
    it("down", function () {
      checkDirection(Sprite.Direction.DOWN, new Point(INIT_X, INIT_Y + SPEED))
    });
    
    function checkDirection(direction, finalPosition) {
      sprite.setXY(INIT_X, INIT_Y);
      sprite.setSpeed(SPEED);
      sprite.setDirection(direction);
      sprite.move();
      expect(sprite.getPosition()).toEqual(finalPosition);
    }
  });
  
  it("#doDestroy", function () {
    spyOn(eventManager, 'removeSubscriber');
    spyOn(eventManager, 'fireEvent');
    spyOn(sprite, 'destroyHook');
    var pauseListener = new PauseListener(eventManager);
    spyOn(pauseListener, 'destroy');
    sprite.setPauseListener(pauseListener);
    sprite.doDestroy();
    expect(eventManager.removeSubscriber).toHaveBeenCalledWith(sprite);
    expect(eventManager.fireEvent).toHaveBeenCalledWith({'name': Sprite.Event.DESTROYED, 'sprite': sprite});
    expect(sprite.destroyHook).toHaveBeenCalled();
    expect(pauseListener.destroy).toHaveBeenCalled();
  });
  
  describe("#update", function () {
    it("not destroyed", function () {
      spyOn(sprite, 'doDestroy');
      spyOn(sprite, 'move');
      sprite.update();
      expect(sprite.doDestroy).not.toHaveBeenCalled();
      expect(sprite.move).toHaveBeenCalled();
    });
    
    it("destroyed", function () {
      spyOn(sprite, 'doDestroy');
      spyOn(sprite, 'move');
      sprite.destroy();
      sprite.update();
      expect(sprite.doDestroy).toHaveBeenCalled();
      expect(sprite.move).not.toHaveBeenCalled();
    });
    
    it("pause", function () {
      eventManager.fireEvent({'name': Pause.Event.START});
      spyOn(sprite, 'move');
      sprite.update();
      expect(sprite.move).not.toHaveBeenCalled();
    });
  });
  
  describe("#isTurn", function () {
    it("test 1", function () {
      sprite.setDirection(Sprite.Direction.RIGHT);
      sprite.move();
      sprite.setDirection(Sprite.Direction.UP);
      expect(sprite.isTurn()).toBeTruthy();
    });
    
    it("test 2", function () {
      sprite.setDirection(Sprite.Direction.RIGHT);
      sprite.move();
      expect(sprite.isTurn()).toBeFalsy();
    });
  });
  
  describe("#getPrevDirection", function () {
    it("test 1", function () {
      sprite.setDirection(Sprite.Direction.RIGHT);
      sprite.setDirection(Sprite.Direction.LEFT);
      expect(sprite.getPrevDirection()).toEqual(Sprite.Direction.RIGHT);
    });
    
    it("test 2", function () {
      sprite.setDirection(Sprite.Direction.DOWN);
      sprite.setDirection(Sprite.Direction.RIGHT);
      expect(sprite.getPrevDirection()).toEqual(Sprite.Direction.DOWN);
    });
  });
  
  describe("#resolveOutOfBounds", function () {
    it("sprite moves right", function () {
      checkDirection(new Point(9, 3), Sprite.Direction.RIGHT, new Point(8, 3));
    });
    
    it("sprite moves left", function () {
      checkDirection(new Point(0, 3), Sprite.Direction.LEFT, new Point(1, 3));
    });
    
    it("sprite moves up", function () {
      checkDirection(new Point(4, 1), Sprite.Direction.UP, new Point(4, 2));
    });
    
    it("sprite moves down", function () {
      checkDirection(new Point(4, 7), Sprite.Direction.DOWN, new Point(4, 6));
    });
    
    function checkDirection(spritePosition, direction, resolvedPosition) {
      sprite.setPosition(spritePosition);
      sprite.setDimensions(2, 2);
      sprite.setDirection(direction);
      var bounds = new Rect(1, 2, 9, 6);
      sprite.resolveOutOfBounds(bounds);
      expect(sprite.getPosition()).toEqual(resolvedPosition);
    }
  });
});

describe("Sprite", function () {
  it("should fire an event when created", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'fireEvent');
    var sprite = new Sprite(eventManager);
    expect(eventManager.fireEvent).toHaveBeenCalledWith({
      'name': Sprite.Event.CREATED,
      'sprite': sprite
    });
  });
});
