describe("Explosion", function () {
  describe("#updateHook", function () {
    it("normal", function () {
      var eventManager = new EventManager();
      var explosion = new Explosion(eventManager);
      spyOn(explosion, 'destroy');
      explosion.setFrames([1]);
      explosion.update();
      expect(explosion.destroy).not.toHaveBeenCalled();
      explosion.update();
      expect(explosion.destroy).toHaveBeenCalled();
    });
    
    it("pause", function () {
      var eventManager = new EventManager();
      var explosion = new Explosion(eventManager);
      eventManager.fireEvent({'name': Pause.Event.START});
      spyOn(explosion, 'destroy');
      explosion.setFrames([1]);
      explosion.update();
      expect(explosion.destroy).not.toHaveBeenCalled();
      explosion.update();
      expect(explosion.destroy).not.toHaveBeenCalled();
    });
  });
});
