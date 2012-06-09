describe("Sprite", function () {
  var eventManager, sprite;
    
  beforeEach(function () {
    eventManager = new EventManager();
    sprite = new Sprite(eventManager);
  });
  
  it("initial state", function () {
    expect(sprite.getDirection()).toEqual(Sprite.Direction.RIGHT);
    expect(sprite.getPrevDirection()).toEqual(Sprite.Direction.RIGHT);
    expect(sprite.getSpeed()).toEqual(0);
    expect(sprite.isDestroyed()).toBeFalsy();
    expect(sprite.isTurn()).toBeFalsy();
  });
  
  describe("#move", function () {
    it("should fire event when moved", function () {
      spyOn(eventManager, 'fireEvent');
      sprite.setSpeed(1);
      sprite.move();
      expect(eventManager.fireEvent).toHaveBeenCalledWith({
        'name': Sprite.Event.MOVED,
        'sprite': sprite});
    });
    
    it("shouldn't fire event if not moved", function () {
      spyOn(eventManager, 'fireEvent');
      sprite.move();
      expect(eventManager.fireEvent).not.toHaveBeenCalled();
    });
  });
  
  describe("#destroy", function () {
    it("not destroyed", function () {
      spyOn(sprite, 'destroyHook');
      sprite.destroy();
      expect(sprite.destroyHook).toHaveBeenCalled();
    });
    
    it("destroyed", function () {
      sprite.destroy();
      spyOn(sprite, 'destroyHook');
      sprite.destroy();
      expect(sprite.destroyHook).not.toHaveBeenCalled();
    });
  });
  
  it("#doDestroy", function () {
    spyOn(eventManager, 'removeSubscriber');
    spyOn(eventManager, 'fireEvent');
    sprite.doDestroy();
    expect(eventManager.removeSubscriber).toHaveBeenCalledWith(sprite);
    expect(eventManager.fireEvent).toHaveBeenCalledWith({'name': Sprite.Event.DESTROYED, 'sprite': sprite});
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
