describe("Cursor", function () {
  it("should move with a delay", function () {
    var eventManager = new EventManager();
    var cursor = new Cursor(eventManager);
    cursor.setMoveDelay(2);
    cursor.toNormalSpeed();
    
    // First move should be without a delay.
    var position1 = cursor.getPosition();
    cursor.update();
    var position2 = cursor.getPosition();
    expect(position2).not.toEqual(position1);
    
    // Then pause.
    cursor.update();
    expect(cursor.getPosition()).toEqual(position2);
    cursor.update();
    expect(cursor.getPosition()).toEqual(position2);
    
    // Move.
    cursor.update();
    position1 = cursor.getPosition();
    expect(position1).not.toEqual(position2);
    
    // Pause.
    cursor.update();
    expect(cursor.getPosition()).toEqual(position1);
    
    // Interrupt the pause. Should move again.
    cursor.toNormalSpeed();
    cursor.update();
    expect(cursor.getPosition()).not.toEqual(position1);
  });
  
  describe("#build", function () {
    it("fire event", function () {
      var eventManager = new EventManager();
      spyOn(eventManager, 'fireEvent');
      var cursor = new Cursor(eventManager);
      cursor.build();
      expect(eventManager.fireEvent).toHaveBeenCalledWith({
        'name': Cursor.Event.BUILD,
        'cursor': cursor
      });
    });
  });
  
  describe("#move", function () {
    it("should fire Cursor.Event.MOVED event", function () {
      var eventManager = new EventManager();
      spyOn(eventManager, 'fireEvent');
      var cursor = new Cursor(eventManager);
      cursor.toNormalSpeed();
      cursor.move();
      expect(eventManager.fireEvent).toHaveBeenCalledWith({
        'name': Cursor.Event.MOVED,
        'cursor': cursor
      });
    });
  });
});
