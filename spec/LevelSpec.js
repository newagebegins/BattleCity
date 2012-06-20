xdescribe("Level", function () {
  it("initial state", function () {
    var level = new Level(new SceneManager(new EventManager()));
    expect(level.getState() instanceof LevelStateStageScreen).toBeTruthy();
  });
});
