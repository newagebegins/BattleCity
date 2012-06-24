describe("PowerUp", function () {
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var powerUp = new PowerUp(eventManager);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(powerUp,
      [CollisionDetector.Event.COLLISION, EnemyFactory.Event.ENEMY_CREATED]);
  });
  
  describe("#notify", function () {
    describe("CollisionDetector.Event.COLLISION", function () {
      it("player", function () {
        var eventManager = new EventManager();
        spyOn(eventManager, 'fireEvent');
        var powerUp = new PowerUp(eventManager);
        spyOn(powerUp, 'destroy');
        var player = new Tank(eventManager);
        powerUp.notify({
          'name': CollisionDetector.Event.COLLISION,
          'initiator': player,
          'sprite': powerUp});
        expect(powerUp.destroy).toHaveBeenCalled();
        expect(powerUp.getPlayerTank()).toEqual(player);
        expect(eventManager.fireEvent).toHaveBeenCalledWith({'name': PowerUp.Event.PICK, 'powerUp': powerUp});
      });
    });
    
    it("EnemyFactory.Event.ENEMY_CREATED", function () {
      var eventManager = new EventManager();
      var enemy = new Tank(eventManager);
      enemy.makeEnemy();
      enemy.startFlashing();
      var powerUp = new PowerUp(eventManager);
      spyOn(powerUp, 'destroy');
      powerUp.notify({'name': EnemyFactory.Event.ENEMY_CREATED, 'enemy': enemy});
      expect(powerUp.destroy).toHaveBeenCalled();
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
