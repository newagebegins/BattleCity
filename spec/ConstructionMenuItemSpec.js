describe("ConstructionMenuItem", function () {
  it("#execute", function () {
    var sceneManager = new SceneManager();
    var item = new ConstructionMenuItem(sceneManager);
    spyOn(sceneManager, 'toConstructionScene');
    item.execute();
    expect(sceneManager.toConstructionScene).toHaveBeenCalled();
  });
});
