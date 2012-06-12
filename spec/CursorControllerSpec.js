describe("CursorController", function () {
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
  });
});
