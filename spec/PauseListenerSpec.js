describe("PauseListener", function () {
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var listener = new PauseListener(eventManager);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(listener, [Pause.Event.START, Pause.Event.END]);
  });
  
  describe("#notify", function () {
    it("Pause.Event.START", function () {
      var eventManager = new EventManager();
      var listener = new PauseListener(eventManager);
      spyOn(listener, 'pause');
      listener.notify({'name': Pause.Event.START});
      expect(listener.pause).toHaveBeenCalled();
    });
    
    it("Pause.Event.END", function () {
      var eventManager = new EventManager();
      var listener = new PauseListener(eventManager);
      spyOn(listener, 'unpause');
      listener.notify({'name': Pause.Event.END});
      expect(listener.unpause).toHaveBeenCalled();
    });
  });
  
  it("#isPaused", function () {
    var eventManager = new EventManager();
    var listener = new PauseListener(eventManager);
    expect(listener.isPaused()).toBeFalsy();
    listener.pause();
    expect(listener.isPaused()).toBeTruthy();
    listener.unpause();
    expect(listener.isPaused()).toBeFalsy();
    listener.pause();
    expect(listener.isPaused()).toBeTruthy();
  });
  
  it("#destroy", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'removeSubscriber');
    var listener = new PauseListener(eventManager);
    listener.destroy();
    expect(eventManager.removeSubscriber).toHaveBeenCalledWith(listener);
  });
});
