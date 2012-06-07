describe("Sprite", function () {
  var eventManager, sprite;
    
  beforeEach(function () {
    eventManager = new EventManager();
    sprite = new Sprite(eventManager);
  });
  
  it("initial state", function () {
    expect(sprite.getDirection()).toEqual(Sprite.Direction.RIGHT);
    expect(sprite.getSpeed()).toEqual(0);
    expect(sprite.isDestroyed()).toBeFalsy();
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
