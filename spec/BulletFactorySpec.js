describe("BulletFactory", function () {
  it("should subscribe", function () {
    var eventManager = new EventManager();
    spyOn(eventManager, 'addSubscriber');
    var factory = new BulletFactory(eventManager);
    expect(eventManager.addSubscriber).toHaveBeenCalledWith(factory, [Tank.Event.SHOOT]);
  });
  
  describe("#createBullet", function () {
    it("RIGHT", function () {
      checkDirection(new Point(0, 0), new Point(30, 14), Sprite.Direction.RIGHT);
    });
    
    it("LEFT", function () {
      checkDirection(new Point(32, 0), new Point(33, 14), Sprite.Direction.LEFT);
    });
    
    it("UP", function () {
      checkDirection(new Point(0, 32), new Point(14, 33), Sprite.Direction.UP);
    });
    
    it("DOWN", function () {
      checkDirection(new Point(0, 0), new Point(14, 30), Sprite.Direction.DOWN);
    });
    
    function checkDirection(tankPosition, bulletPosition, direction) {
      var BULLET_SIZE = 4;
      var BULLET_SPEED = 8;
      
      var eventManager = new EventManager();
      spyOn(eventManager, 'fireEvent');
      
      var factory = new BulletFactory(eventManager);

      var tank = new Tank(eventManager);
      tank.setPosition(tankPosition);
      tank.setDimensions(32, 32);
      tank.setDirection(direction);
      tank.setBulletSize(BULLET_SIZE);
      tank.setBulletSpeed(BULLET_SPEED);

      var bullet = new Bullet(eventManager, tank);
      bullet.setPosition(bulletPosition);
      bullet.setDimensions(BULLET_SIZE, BULLET_SIZE);
      bullet.setDirection(direction);
      bullet.setSpeed(BULLET_SPEED);
      
      expect(factory.createBullet(tank)).toEqual(bullet);
    }
  });
  
  describe("#createBullet", function () {
    it("normal", function () {
      checkType(Bullet.Type.NORMAL);
    });
    
    it("enhanced", function () {
      checkType(Bullet.Type.ENHANCED);
    });
    
    function checkType(type) {
      var eventManager = new EventManager();
      var factory = new BulletFactory(eventManager);
      var tank = new Tank(eventManager);
      tank.setBulletType(type);
      var bullet = factory.createBullet(tank)
      expect(bullet.getType()).toEqual(type);
    }
  });
  
  it("should create a bullet when tank shoots", function () {
    var eventManager = new EventManager();
    var factory = new BulletFactory(eventManager);
    spyOn(factory, 'createBullet');
    var tank = new Tank(eventManager);
    factory.notify({'name': Tank.Event.SHOOT, 'tank': tank});
    expect(factory.createBullet).toHaveBeenCalledWith(tank);
  });
});
