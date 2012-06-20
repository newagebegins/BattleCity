describe("MainMenuScene", function () {
  describe("#updatePosition", function () {
    it("speed - 1", function () {
      var scene = new MainMenuScene();
      scene.setSpeed(1);
      scene.setY(2);
      expect(scene.getY()).toEqual(2);
      scene.updatePosition();
      expect(scene.getY()).toEqual(1);
      scene.updatePosition();
      expect(scene.getY()).toEqual(0);
      scene.updatePosition();
      expect(scene.getY()).toEqual(0);
    });
    
    it("speed - 2", function () {
      var scene = new MainMenuScene();
      scene.setSpeed(2);
      scene.setY(6);
      expect(scene.getY()).toEqual(6);
      scene.updatePosition();
      expect(scene.getY()).toEqual(4);
      scene.updatePosition();
      expect(scene.getY()).toEqual(2);
    });
  });
  
  it("#update", function () {
    var scene = new MainMenuScene();
    spyOn(scene, 'updatePosition');
    scene.update();
    expect(scene.updatePosition).toHaveBeenCalled();
  });
});
