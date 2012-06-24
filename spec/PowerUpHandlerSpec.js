describe("PowerUpHandler", function () {
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var handler = new PowerUpHandler(eventManager);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(handler, [PowerUp.Event.PICK]);
  });
  
  describe("#notify", function () {
    it("PowerUp.Event.PICK", function () {
      var eventManager = new EventManager();
      var handler = new PowerUpHandler(eventManager);
      spyOn(handler, 'handle');
      var powerUp = new PowerUp(eventManager);
      handler.notify({'name': PowerUp.Event.PICK, 'powerUp': powerUp});
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
    
    it("star", function () {
      spyOn(handler, 'handleStar');
      var player = new Tank(eventManager);
      powerUp.setType(PowerUp.Type.STAR);
      powerUp.setPlayerTank(player);
      handler.handle(powerUp);
      expect(handler.handleStar).toHaveBeenCalledWith(player);
    });
    
    it("tank", function () {
      spyOn(handler, 'handleTank');
      powerUp.setType(PowerUp.Type.TANK);
      handler.handle(powerUp);
      expect(handler.handleTank).toHaveBeenCalled();
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
    expect(state.getStateDuration()).toEqual(PowerUpHandler.HELMET_DURATION);
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
    spyOn(eventManager, 'fireEvent');
    var handler = new PowerUpHandler(eventManager);
    handler.handleShovel();
    expect(eventManager.fireEvent).toHaveBeenCalledWith({'name': PowerUpHandler.Event.SHOVEL_START});
  });
  
  it("#handleStar", function () {
    var eventManager = new EventManager();
    var handler = new PowerUpHandler(eventManager);
    var player = new Tank(eventManager);
    spyOn(player, 'upgrade');
    handler.handleStar(player);
    expect(player.upgrade).toHaveBeenCalled();
  });
  
  it("#handleTank", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'fireEvent');
    var handler = new PowerUpHandler(eventManager);
    handler.handleTank();
    expect(eventManager.fireEvent).toHaveBeenCalledWith({'name': PowerUpHandler.Event.TANK});
  });
});
