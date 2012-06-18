describe("FreezeTimer", function () {
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var timer = new FreezeTimer(eventManager);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(timer, [PowerUpHandler.Event.FREEZE]);
  });
  
  describe("#notify", function () {
    it("PowerUpHandler.Event.FREEZE", function () {
      var eventManager = new EventManager();
      var timer = new FreezeTimer(eventManager);
      spyOn(timer, 'start');
      timer.notify({'name': PowerUpHandler.Event.FREEZE});
      expect(timer.start).toHaveBeenCalled();
    });
  });
  
  describe("#update", function () {
    it("normal", function () {
      var eventManager = new EventManager();
      var timer = new FreezeTimer(eventManager);
      spyOn(timer, 'unfreeze');
      timer.setDuration(2);
      timer.start();
      timer.update();
      expect(timer.unfreeze).not.toHaveBeenCalled();
      timer.update();
      expect(timer.unfreeze).not.toHaveBeenCalled();
      timer.update();
      expect(timer.unfreeze).toHaveBeenCalled();
      timer.unfreeze.reset();
      timer.update();
      expect(timer.unfreeze).not.toHaveBeenCalled();
      timer.update();
      expect(timer.unfreeze).not.toHaveBeenCalled();
      timer.update();
      expect(timer.unfreeze).not.toHaveBeenCalled();
      timer.start();
      timer.update();
      expect(timer.unfreeze).not.toHaveBeenCalled();
      timer.update();
      expect(timer.unfreeze).not.toHaveBeenCalled();
      timer.update();
      expect(timer.unfreeze).toHaveBeenCalled();
    });
    
    it("pause", function () {
      var eventManager = new EventManager();
      var timer = new FreezeTimer(eventManager);
      eventManager.fireEvent({'name': Pause.Event.START});
      spyOn(timer, 'unfreeze');
      timer.setDuration(2);
      timer.start();
      timer.update();
      expect(timer.unfreeze).not.toHaveBeenCalled();
      timer.update();
      expect(timer.unfreeze).not.toHaveBeenCalled();
      timer.update();
      expect(timer.unfreeze).not.toHaveBeenCalled();
    });
  });
  
  it("#unfreeze", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'fireEvent');
    var timer = new FreezeTimer(eventManager);
    timer.unfreeze();
    expect(eventManager.fireEvent).toHaveBeenCalledWith({'name': FreezeTimer.Event.UNFREEZE});
  });
});
