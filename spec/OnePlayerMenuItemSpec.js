describe("OnePlayerMenuItem", function () {
  it("#execute", function () {
    var sceneManager = new SceneManager();
    var item = new OnePlayerMenuItem(sceneManager);
    spyOn(sceneManager, 'toGameScene');
    item.execute();
    expect(sceneManager.toGameScene).toHaveBeenCalled();
  });
});
