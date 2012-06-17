describe("PowerUpHandler", function () {
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var handler = new PowerUpHandler(eventManager);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(handler, [PowerUp.Event.DESTROYED]);
  });
  
  describe("#notify", function () {
    it("PowerUp.Event.DESTROYED", function () {
      var eventManager = new EventManager();
      var handler = new PowerUpHandler(eventManager);
      spyOn(handler, 'handle');
      var powerUp = new PowerUp(eventManager);
      handler.notify({'name': PowerUp.Event.DESTROYED, 'powerUp': powerUp});
      expect(handler.handle).toHaveBeenCalledWith(powerUp);
    });
  });
  
  describe("#handle", function () {
    var eventManager, powerUp, handler;
    
    beforeEach(function () {
      eventManager = new EventManager();
      powerUp = new PowerUp(eventManager);
      handler = new PowerUpHandler(eventManager);
    });
    
    it("grenade", function () {
      spyOn(handler, 'handleGrenade');
      powerUp.setType(PowerUp.Type.GRENADE);
      handler.handle(powerUp);
      expect(handler.handleGrenade).toHaveBeenCalled();
    });
    
    it("helmet", function () {
      spyOn(handler, 'handleHelmet');
      var player = new Tank(eventManager);
      powerUp.setType(PowerUp.Type.HELMET);
      powerUp.setPlayerTank(player);
      handler.handle(powerUp);
      expect(handler.handleHelmet).toHaveBeenCalledWith(player);
    });
    
    it("timer", function () {
      spyOn(handler, 'handleTimer');
      powerUp.setType(PowerUp.Type.TIMER);
      handler.handle(powerUp);
      expect(handler.handleTimer).toHaveBeenCalled();
    });
    
    it("shovel", function () {
      spyOn(handler, 'handleShovel');
      powerUp.setType(PowerUp.Type.SHOVEL);
      handler.handle(powerUp);
      expect(handler.handleShovel).toHaveBeenCalled();
    });
  });
  
  it("#handleGrenade", function () {
    var eventManager = new EventManager();
    var handler = new PowerUpHandler(eventManager);
    
    var container = new SpriteContainer(eventManager);
    handler.setSpriteContainer(container);
    
    var enemyOne = new Tank(eventManager);
    spyOn(enemyOne, 'destroy');
    enemyOne.makeEnemy();
    enemyOne.setValue(100);
    container.addSprite(enemyOne);
    
    var enemyTwo = new Tank(eventManager);
    spyOn(enemyTwo, 'destroy');
    enemyTwo.makeEnemy();
    enemyTwo.setValue(200);
    container.addSprite(enemyTwo);
    
    handler.handleGrenade();
    
    expect(enemyOne.destroy).toHaveBeenCalled();
    expect(enemyOne.getValue()).toEqual(0);
    expect(enemyTwo.destroy).toHaveBeenCalled();
    expect(enemyTwo.getValue()).toEqual(0);
  });
  
  it("#handleHelmet", function () {
    var eventManager = new EventManager();
    var handler = new PowerUpHandler(eventManager);
    var player = new Tank(eventManager);
    handler.handleHelmet(player);
    var state = player.getState();
    expect(state instanceof TankStateInvincible).toBeTruthy();
    expect(state.getStateDuration()).toEqual(Globals.HELMET_DURATION);
  });
  
  it("#handleTimer", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'fireEvent');
    var handler = new PowerUpHandler(eventManager);
    handler.handleTimer();
    expect(eventManager.fireEvent).toHaveBeenCalledWith({'name': PowerUpHandler.Event.FREEZE});
  });
  
  it("#handleShovel", function () {
    var eventManager = new EventManager();
    
    var container = new SpriteContainer(eventManager);
    
    var baseWallBuilder = new BaseWallBuilder();
    baseWallBuilder.setWallFactory(new BrickWallFactory(eventManager));
    baseWallBuilder.setWallPositions([new Point(0,0), new Point(10, 20)]);
    baseWallBuilder.buildWall();
    
    var handler = new PowerUpHandler(eventManager);
    handler.setSpriteContainer(container);
    handler.setBaseWallBuilder(baseWallBuilder);
    
    spyOn(baseWallBuilder, 'destroyWall');
    spyOn(baseWallBuilder, 'setWallFactory');
    spyOn(baseWallBuilder, 'buildWall');
    
    handler.handleShovel();
    
    expect(baseWallBuilder.destroyWall).toHaveBeenCalled();
    expect(baseWallBuilder.setWallFactory).toHaveBeenCalledWith(new SteelWallFactory(eventManager));
    expect(baseWallBuilder.buildWall).toHaveBeenCalled();
  });
});
