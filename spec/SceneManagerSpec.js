describe("SceneManager", function () {
  it("#update", function () {
    var manager = new SceneManager();
    var scene = jasmine.createSpyObj('scene', ['update']);
    manager.setScene(scene);
    manager.update();
    expect(scene.update).toHaveBeenCalled();
  });
  
  it("#draw", function () {
    var manager = new SceneManager();
    var scene = jasmine.createSpyObj('scene', ['draw']);
    manager.setScene(scene);
    var ctx = 'ctx';
    manager.draw(ctx);
    expect(scene.draw).toHaveBeenCalledWith(ctx);
  });
});
