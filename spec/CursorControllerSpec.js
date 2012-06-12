describe("CursorController", function () {
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var cursor = new Cursor(eventManager);
    var cursorController = new CursorController(eventManager, cursor);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(cursorController, [Cursor.Event.MOVED]);
  });
  
  it("SPACE pressed - call build()", function () {
    var eventManager = new EventManager();
    var cursor = new Cursor(eventManager);
    spyOn(cursor, 'build');
    var cursorController = new CursorController(eventManager, cursor);
    
    cursorController.notify({name: Keyboard.Event.KEY_PRESSED, key: Keyboard.Key.SPACE});
    expect(cursor.build).toHaveBeenCalled();
    cursor.build.reset();
    
    cursorController.notify({name: Keyboard.Event.KEY_PRESSED, key: Keyboard.Key.SPACE});
    expect(cursor.build).not.toHaveBeenCalled();
    cursor.build.reset();
    
    cursorController.notify({name: Keyboard.Event.KEY_RELEASED, key: Keyboard.Key.SPACE});
    cursorController.notify({name: Keyboard.Event.KEY_PRESSED, key: Keyboard.Key.SPACE});
    expect(cursor.build).toHaveBeenCalled();
    cursor.build.reset();
    
    cursorController.notify({'name': Cursor.Event.MOVED, 'cursor': cursor});
    expect(cursor.build).toHaveBeenCalled();
    cursor.build.reset();
    
    cursorController.notify({name: Keyboard.Event.KEY_RELEASED, key: Keyboard.Key.SPACE});
    cursorController.notify({'name': Cursor.Event.MOVED, 'cursor': cursor});
    expect(cursor.build).not.toHaveBeenCalled();
  });
});
