describe("SceneManager", function () {
  it("#update", function () {
    var manager = new SceneManager();
    var scene = new MainMenuScene();
    spyOn(scene, 'update');
    manager.setScene(scene);
    manager.update();
    expect(scene.update).toHaveBeenCalled();
  });
  
  it("#toMainMenuScene", function () {
    var manager = new SceneManager();
    manager.toMainMenuScene();
    expect(manager.getScene() instanceof MainMenuScene).toBeTruthy();
  });
});
