describe("Pause", function () {
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var pause = new Pause(eventManager);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(pause,
      [Keyboard.Event.KEY_PRESSED, Keyboard.Event.KEY_RELEASED]);
  });
  
  describe("#notify", function () {
    it("Keyboard.Event.KEY_PRESSED", function () {
      var eventManager = new EventManager();
      var pause = new Pause(eventManager);
      spyOn(pause, 'keyPressed');
      pause.notify({'name': Keyboard.Event.KEY_PRESSED, 'key': Keyboard.Key.P});
      expect(pause.keyPressed).toHaveBeenCalledWith(Keyboard.Key.P);
    });
    
    it("Keyboard.Event.KEY_RELEASED", function () {
      var eventManager = new EventManager();
      var pause = new Pause(eventManager);
      spyOn(pause, 'keyReleased');
      pause.notify({'name': Keyboard.Event.KEY_RELEASED, 'key': Keyboard.Key.P});
      expect(pause.keyReleased).toHaveBeenCalledWith(Keyboard.Key.P);
    });
  });
  
  it("#keyPressed and #keyReleased", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'fireEvent');
    var pause = new Pause(eventManager);
    
    pause.keyPressed(Keyboard.Key.P);
    expect(eventManager.fireEvent).toHaveBeenCalledWith({'name': Pause.Event.START});
    
    eventManager.fireEvent.reset();
    pause.keyPressed(Keyboard.Key.P);
    expect(eventManager.fireEvent).not.toHaveBeenCalled();
    
    pause.keyReleased(Keyboard.Key.P);
    pause.keyPressed(Keyboard.Key.P);
    expect(eventManager.fireEvent).toHaveBeenCalledWith({'name': Pause.Event.END});
  });
});
