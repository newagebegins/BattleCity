describe("SceneManager", function () {
  it("#update", function () {
    var eventManager = new EventManager();
    var manager = new SceneManager(eventManager);
    var scene = new MainMenuScene(manager);
    spyOn(scene, 'update');
    manager.setScene(scene);
    manager.update();
    expect(scene.update).toHaveBeenCalled();
  });
  
  it("#toMainMenuScene", function () {
    var manager = new SceneManager(new EventManager());
    manager.toMainMenuScene();
    expect(manager.getScene() instanceof MainMenuScene).toBeTruthy();
  });
});
