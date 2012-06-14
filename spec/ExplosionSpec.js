describe("Explosion", function () {
  it("should be destroyed when animation is finished", function () {
    var eventManager = new EventManager();
    var explosion = new Explosion(eventManager);
    spyOn(explosion, 'destroy');
    explosion.setFrames([1]);
    explosion.update();
    expect(explosion.destroy).not.toHaveBeenCalled();
    explosion.update();
    expect(explosion.destroy).toHaveBeenCalled();
  });
});
