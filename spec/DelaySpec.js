describe("Delay", function () {
  it("#update", function () {
    var script = jasmine.createSpyObj('script', ['actionCompleted']);
    var delay = new Delay(script, 3);
    delay.update();
    expect(script.actionCompleted).not.toHaveBeenCalled();
    delay.update();
    expect(script.actionCompleted).not.toHaveBeenCalled();
    delay.update();
    expect(script.actionCompleted).not.toHaveBeenCalled();
    delay.update();
    expect(script.actionCompleted).toHaveBeenCalled();
  });
});
