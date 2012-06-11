describe("CursorController", function () {
  it("SPACE released - call build()", function () {
    var eventManager = new EventManager();
    var cursor = new Cursor(eventManager);
    spyOn(cursor, 'build');
    var cursorController = new CursorController(eventManager, cursor);
    cursorController.notify({name: Keyboard.Event.KEY_RELEASED, key: Keyboard.Key.SPACE});
    expect(cursor.build).toHaveBeenCalled();
  });
});
