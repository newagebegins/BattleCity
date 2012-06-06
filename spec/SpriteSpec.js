describe("Sprite", function () {
  var eventManager, sprite;
    
  beforeEach(function () {
    eventManager = new EventManager();
    sprite = new Sprite(eventManager);
  });
    
  describe("initial state", function () {
    it("direction should be Right", function () {
      expect(sprite.getDirection()).toEqual(Sprite.Direction.RIGHT);
    });
    
    it("speed should be 0", function () {
      expect(sprite.getSpeed()).toEqual(0);
    });
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
});
