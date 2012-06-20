describe("OnePlayerMenuItem", function () {
  it("#execute", function () {
    var sceneManager = new SceneManager();
    var item = new OnePlayerMenuItem(sceneManager);
    spyOn(sceneManager, 'toLevelScene');
    item.execute();
    expect(sceneManager.toLevelScene).toHaveBeenCalled();
  });
});
