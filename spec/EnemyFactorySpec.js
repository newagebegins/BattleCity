describe("EnemyFactory", function () {
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var factory = new EnemyFactory(eventManager);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(factory, [Tank.Event.ENEMY_DESTROYED]);
  });
  
  it("#nextPosition", function () {
    var eventManager = new EventManager();
    var POSITION_1 = new Point(0, 0);
    var POSITION_2 = new Point(10, 20);
    var POSITION_3 = new Point(40, 100);
    var factory = new EnemyFactory(eventManager);
    factory.setPositions([POSITION_1, POSITION_2, POSITION_3]);
    expect(factory.getNextPosition()).toEqual(POSITION_1);
    factory.nextPosition();
    expect(factory.getNextPosition()).toEqual(POSITION_2);
    factory.nextPosition();
    expect(factory.getNextPosition()).toEqual(POSITION_3);
    factory.nextPosition();
    expect(factory.getNextPosition()).toEqual(POSITION_1);
  });
  
  it("#nextEnemy", function () {
    var eventManager = new EventManager();
    var factory = new EnemyFactory(eventManager);
    var ENEMY_1 = {type: Tank.Type.BASIC};
    var ENEMY_2 = {type: Tank.Type.FAST};
    var ENEMY_3 = {type: Tank.Type.FAST};
    var ENEMY_4 = {type: Tank.Type.BASIC};
    factory.setEnemies([ENEMY_1, ENEMY_2, ENEMY_3, ENEMY_4]);
    expect(factory.getNextEnemy()).toEqual(ENEMY_1);
    factory.nextEnemy();
    expect(factory.getNextEnemy()).toEqual(ENEMY_2);
    factory.nextEnemy();
    expect(factory.getNextEnemy()).toEqual(ENEMY_3);
    factory.nextEnemy();
    expect(factory.getNextEnemy()).toEqual(ENEMY_4);
  });
  
  it("#update", function () {
    var eventManager = new EventManager();
    var factory = new EnemyFactory(eventManager);
    spyOn(factory, 'create');
    factory.setInterval(3);
    factory.update();
    expect(factory.create).toHaveBeenCalled();
    factory.create.reset();
    factory.update();
    expect(factory.create).not.toHaveBeenCalled();
    factory.update();
    expect(factory.create).not.toHaveBeenCalled();
    factory.update();
    expect(factory.create).not.toHaveBeenCalled();
    factory.update();
    expect(factory.create).toHaveBeenCalled();
    factory.create.reset();
    factory.update();
    expect(factory.create).not.toHaveBeenCalled();
    factory.update();
    expect(factory.create).not.toHaveBeenCalled();
    factory.update();
    expect(factory.create).not.toHaveBeenCalled();
    factory.update();
    expect(factory.create).toHaveBeenCalled();
  });
  
  describe("#create", function () {
    it("stop creation when no more enemies left", function () {
      var eventManager = new EventManager();
      var factory = new EnemyFactory(eventManager);
      spyOn(factory, 'createEnemy');
      var ENEMY_1 = {type: Tank.Type.BASIC};
      var ENEMY_2 = {type: Tank.Type.FAST};
      var ENEMY_3 = {type: Tank.Type.FAST};
      var ENEMY_4 = {type: Tank.Type.BASIC};
      factory.setEnemies([ENEMY_1, ENEMY_2, ENEMY_3, ENEMY_4]);
      var POSITION_1 = new Point(0, 0);
      var POSITION_2 = new Point(10, 20);
      var POSITION_3 = new Point(40, 100);
      factory.setPositions([POSITION_1, POSITION_2, POSITION_3]);

      factory.create();
      expect(factory.createEnemy).toHaveBeenCalledWith(ENEMY_1, POSITION_1);
      factory.createEnemy.reset();

      factory.create();
      expect(factory.createEnemy).toHaveBeenCalledWith(ENEMY_2, POSITION_2);
      factory.createEnemy.reset();

      factory.create();
      expect(factory.createEnemy).toHaveBeenCalledWith(ENEMY_3, POSITION_3);
      factory.createEnemy.reset();

      factory.create();
      expect(factory.createEnemy).toHaveBeenCalledWith(ENEMY_4, POSITION_1);
      factory.createEnemy.reset();

      factory.create();
      expect(factory.createEnemy).not.toHaveBeenCalled();
    });
    
    it("stop creation when concurrent number of tanks has reached its limit", function () {
      var eventManager = new EventManager();
      var factory = new EnemyFactory(eventManager);
      var ENEMY_1 = {type: Tank.Type.BASIC};
      var ENEMY_2 = {type: Tank.Type.FAST};
      var ENEMY_3 = {type: Tank.Type.FAST};
      var ENEMY_4 = {type: Tank.Type.BASIC};
      factory.setEnemies([ENEMY_1, ENEMY_2, ENEMY_3, ENEMY_4]);
      var POSITION_1 = new Point(0, 0);
      var POSITION_2 = new Point(10, 20);
      var POSITION_3 = new Point(40, 100);
      factory.setPositions([POSITION_1, POSITION_2, POSITION_3]);
      factory.setEnemyCountLimit(2);

      factory.create();
      expect(factory.getEnemyCount()).toEqual(1);

      factory.create();
      expect(factory.getEnemyCount()).toEqual(2);

      factory.create();
      expect(factory.getEnemyCount()).toEqual(2);
    });
  });
  
  it("#createEnemy", function () {
    var eventManager = new EventManager();
    var factory = new EnemyFactory(eventManager);
    var enemy = {type: Tank.Type.BASIC};
    var position = new Point(1, 2);
    
    expect(factory.getEnemyCount()).toEqual(0);
    
    var tank = factory.createEnemy(enemy, position);
    
    expect(factory.getEnemyCount()).toEqual(1);
    
    expect(tank instanceof Tank).toBeTruthy();
    expect(tank.getType()).toEqual(enemy.type);
    expect(tank.getPosition()).toEqual(position);
    expect(tank.getState() instanceof TankStateAppearing).toBeTruthy();
    expect(tank.isPlayer()).toBeFalsy();
  });
  
  describe("#notify", function () {
    it("Tank.Event.ENEMY_DESTROYED", function () {
      var eventManager = new EventManager();
      var factory = new EnemyFactory(eventManager);
      spyOn(factory, 'create');
      var enemy = {type: Tank.Type.BASIC};
      var position = new Point(1, 2);
      var tank = factory.createEnemy(enemy, position);
      
      expect(factory.getEnemyCount()).toEqual(1);
      
      factory.notify({'name': Tank.Event.ENEMY_DESTROYED, 'tank': tank});
      
      expect(factory.getEnemyCount()).toEqual(0);
      expect(factory.create).toHaveBeenCalled();
    });
  });
});
