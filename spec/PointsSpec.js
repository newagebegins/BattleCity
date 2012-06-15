describe("Points", function () {
  it("#update", function () {
    var eventManager = new EventManager();
    var points = new Points(eventManager);
    spyOn(points, 'destroy');
    points.setDuration(3);
    points.updateTimer();
    expect(points.destroy).not.toHaveBeenCalled();
    points.updateTimer();
    expect(points.destroy).not.toHaveBeenCalled();
    points.updateTimer();
    expect(points.destroy).not.toHaveBeenCalled();
    points.updateTimer();
    expect(points.destroy).toHaveBeenCalled();
  });
  
  it("#updateHook", function () {
    var eventManager = new EventManager();
    var points = new Points(eventManager);
    spyOn(points, 'updateTimer');
    points.updateHook();
    expect(points.updateTimer).toHaveBeenCalled();
  });
  
  it("#destroyHook", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'fireEvent');
    var points = new Points(eventManager);
    points.destroyHook();
    expect(eventManager.fireEvent).toHaveBeenCalledWith({'name': Points.Event.DESTROYED, 'points': points});
  });
});
