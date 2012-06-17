describe("Score", function () {
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var score = new Score(eventManager);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(score, [PointsFactory.Event.POINTS_CREATED]);
  });
  
  describe("#notify", function () {
    it("PointsFactory.Event.POINTS_CREATED", function () {
      var eventManager = new EventManager();
      var score = new Score(eventManager);
      spyOn(score, 'add');
      var points = new Points(eventManager);
      score.notify({'name': PointsFactory.Event.POINTS_CREATED, 'points': points});
      expect(score.add).toHaveBeenCalledWith(points);
    });
  });
  
  it("#add", function () {
    var eventManager = new EventManager();
    var score = new Score(eventManager);
    var points = new Points(eventManager);
    points.setValue(100);
    expect(score.getValue()).toEqual(0);
    score.add(points);
    expect(score.getValue()).toEqual(100);
  });
});
