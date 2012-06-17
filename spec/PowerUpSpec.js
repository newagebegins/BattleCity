describe("PowerUp", function () {
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var powerUp = new PowerUp(eventManager);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(powerUp, [CollisionDetector.Event.COLLISION]);
  });
  
  describe("#notify", function () {
    describe("CollisionDetector.Event.COLLISION", function () {
      it("player", function () {
        var eventManager = new EventManager();
        var powerUp = new PowerUp(eventManager);
        spyOn(powerUp, 'destroy');
        var player = new Tank(eventManager);
        powerUp.notify({
          'name': CollisionDetector.Event.COLLISION,
          'initiator': player,
          'sprite': powerUp});
        expect(powerUp.destroy).toHaveBeenCalled();
        expect(powerUp.getPlayerTank()).toEqual(player);
      });
    });
  });
  
  it("#destroyHook", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'fireEvent');
    var powerUp = new PowerUp(eventManager);
    powerUp.destroyHook();
    expect(eventManager.fireEvent).toHaveBeenCalledWith({'name': PowerUp.Event.DESTROYED, 'powerUp': powerUp});
  });
});
