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
  
  describe("#updateHook", function () {
    it("normal", function () {
      var eventManager = new EventManager();
      var points = new Points(eventManager);
      spyOn(points, 'updateTimer');
      points.updateHook();
      expect(points.updateTimer).toHaveBeenCalled();
    });
    
    it("pause", function () {
      var eventManager = new EventManager();
      var points = new Points(eventManager);
      eventManager.fireEvent({'name': Pause.Event.START});
      spyOn(points, 'updateTimer');
      points.updateHook();
      expect(points.updateTimer).not.toHaveBeenCalled();
    });
  });
  
  it("#destroyHook", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'fireEvent');
    var points = new Points(eventManager);
    points.destroyHook();
    expect(eventManager.fireEvent).toHaveBeenCalledWith({'name': Points.Event.DESTROYED, 'points': points});
  });
});
